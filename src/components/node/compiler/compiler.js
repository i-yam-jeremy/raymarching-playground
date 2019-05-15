import SDFOutput from '../node-types/sdf-output.jsx'

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

function getNodeMethodName(nodeIndex) {
  return 'node_' + nodeIndex
}

function getNodeVariableName(nodeIndex) {
  return 'node_value_' + nodeIndex
}

function compileNodeComponent(nodeComponent, methodName) {
  return nodeComponent.nodeContent.compile(methodName)
}

function convertToCompiledNodeTree(nodeComponent, nodeIndex) {
  let inputs = []
  for (let input of nodeComponent.props.inputs) {
    let inputNodeComponent = nodeComponent.inputComponents[input.name].connectedOutput.props.parent
    let inputNode = convertToCompiledNodeTree(inputNodeComponent, nodeIndex)
    nodeIndex = inputNode.index+1
    inputs.push(inputNode)
  }

  return new CompiledNode(nodeIndex, compileNodeComponent(nodeComponent, getNodeMethodName(nodeIndex)), nodeComponent.props.nodeContent, inputs)
}

function combineCompiledNodes(compiledNodes) {
  let nodeFunctions = ''
  let mainFunctionBody = ''

  for (let node of compiledNodes) {
    if (node.source) {
      nodeFunctions += node.source + '\n'
    }

    let argVars = node.inputs.map(n => getNodeVariableName(n.index))
    let specialInputs = (node.type.specialInputs ? node.type.specialInputs : [])
    let args = (specialInputs.concat(argVars)).join(', ')
    let value = getNodeMethodName(node.index) + '(' + args + ');'
    let varAssignment = node.type.outputType + ' ' + getNodeVariableName(node.index) + ' = '
    let lhs = (node.type == SDFOutput ? 'return ' : varAssignment)
    mainFunctionBody += lhs + value
    mainFunctionBody += '\n'
  }

  return SDF_GLSL_BOILERPLATE_SOURCE
    .replace("$$NODE_FUNCTIONS$$", nodeFunctions)
    .replace("$$MODEL_SDF_FUNCTION_BODY$$", mainFunctionBody)
}


function compileNode(nodeComponent) {
  let compiledNodeTree = convertToCompiledNodeTree(nodeComponent, 0)
  let compiledNodes = compiledNodeTree.flatten()
  let source = combineCompiledNodes(compiledNodes)
  return source
}

export default compileNode
