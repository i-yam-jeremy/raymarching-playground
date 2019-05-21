import GLSL_BOILERPLATE_SOURCE from './glsl-boilerplate.glsl'

class CompiledNode {

  constructor(index, source, type, inputs) {
    this.index = index
    this.source = source
    this.type = type
    this.inputs = inputs
  }

  flatten() {
    return this.inputs
      .map(inputNode => inputNode.flatten())
      .reduce((a, b) => a.concat(b), [])
      .concat([this])
  }

}

function getNodeMethodName(nodeIndex, nodeFunctionPrefix) {
  return nodeFunctionPrefix + '_node_' + nodeIndex
}

function getNodeVariableName(nodeIndex) {
  return 'node_value_' + nodeIndex
}

function compileNodeComponent(nodeComponent, methodName) {
  return nodeComponent.nodeContent.compile(methodName)
}

function convertToCompiledNodeTree(nodeComponent, nodeIndex, nodeFunctionPrefix) {
  let inputs = []
  for (let input of nodeComponent.props.inputs) {
    let inputNodeComponent = nodeComponent.inputComponents[input.name].connectedOutput.props.parent
    let inputNode = convertToCompiledNodeTree(inputNodeComponent, nodeIndex, nodeFunctionPrefix)
    nodeIndex = inputNode.index+1
    inputs.push(inputNode)
  }

  return new CompiledNode(nodeIndex, compileNodeComponent(nodeComponent, getNodeMethodName(nodeIndex, nodeFunctionPrefix)), nodeComponent.props.nodeContent, inputs)
}

class SourcePair {

  constructor(nodeFunctions, mainFunctionBody) {
    this.nodeFunctions = nodeFunctions
    this.mainFunctionBody = mainFunctionBody
  }

}

function combineCompiledNodes(compiledNodes, nodeFunctionPrefix) {
  let nodeFunctions = ''
  let mainFunctionBody = ''

  for (let node of compiledNodes) {
    if (node.source) {
      nodeFunctions += node.source + '\n'
    }

    let argVars = node.inputs.map(n => getNodeVariableName(n.index))
    let specialInputs = (node.type.specialInputs ? node.type.specialInputs : [])
    let args = (specialInputs.concat(argVars)).join(', ')
    let value = getNodeMethodName(node.index, nodeFunctionPrefix) + '(' + args + ');'
    let varAssignment = node.type.outputType + ' ' + getNodeVariableName(node.index) + ' = '
    let lhs = (node.type.outputType == null ? 'return ' : varAssignment)
    mainFunctionBody += lhs + value
    mainFunctionBody += '\n'
  }


  return new SourcePair(nodeFunctions, mainFunctionBody)
}


function compileNode(nodeComponent, nodeFunctionPrefix) {
  let compiledNodeTree = convertToCompiledNodeTree(nodeComponent, 0, nodeFunctionPrefix)
  let compiledNodes = compiledNodeTree.flatten()
  let source = combineCompiledNodes(compiledNodes, nodeFunctionPrefix)
  return source
}

function compile(sdfOutputNode, shaderOutputNode) {
  let sdf = compileNode(sdfOutputNode, 'sdf')
  let shader = compileNode(shaderOutputNode, 'shader')

  return GLSL_BOILERPLATE_SOURCE
    .replace("$$SDF_NODE_FUNCTIONS$$", sdf.nodeFunctions)
    .replace("$$SDF_MAIN_FUNCTION_BODY$$", sdf.mainFunctionBody)
    .replace("$$SHADER_NODE_FUNCTIONS$$", shader.nodeFunctions)
    .replace("$$SHADER_MAIN_FUNCTION_BODY$$", shader.mainFunctionBody)
}

export default compile
