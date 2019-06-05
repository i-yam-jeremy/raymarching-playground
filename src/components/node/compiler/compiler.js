import React from 'react'
import ErrorManager from '../../error/error-manager.jsx'
import FileManager from '../../file-manager/file-manager.js'
import getNodeTypes from '../node-types/index.jsx'
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

function compileNodeComponent(node, filename, editorType, methodName) {
  return getNodeContent(node, filename, editorType).compile(methodName)
}

function getNodeContentClass(node, filename, editorType) {
  let nodeType
  let nodeTypes = getNodeTypes(filename, editorType)
  if (node.type == 'CustomNode') {
    let customNodes = nodeTypes['Custom']
    for (let customNode of customNodes) {
      if (customNode.title == node.filename) {
        nodeType = customNode
        break
      }
    }
    if (!nodeType) {
      throw 'Custom node for ' + node.filename + ' not found'
    }
  }
  else {
    for (let category in nodeTypes) {
      for (let type of nodeTypes[category]) {
        if (type.name == node.type) {
          nodeType = type
        }
      }
    }
  }

  return nodeType
}

function getNodeContent(node, filename, editorType) {
  let nodeType = getNodeContentClass(node, filename, editorType)
  let content = new (nodeType)()
  if (node.content) {
    content.loadState(node.content)
  }

  return content
}

function convertToCompiledNodeTree(node, nodeIndex, nodeFunctionPrefix, nodesById, filename, editorType) {
  let inputs = []
  for (let inputName in node.inputs) {
    let input = node.inputs[inputName]
    let inputNode = nodesById[input.id]
    let compiledInputNode = convertToCompiledNodeTree(inputNode, nodeIndex, nodeFunctionPrefix, nodesById, filename, editorType)
    nodeIndex = compiledInputNode.index+1
    inputs.push(compiledInputNode)
  }

  return new CompiledNode(
    nodeIndex,
    compileNodeComponent(node, filename, editorType, getNodeMethodName(nodeIndex, nodeFunctionPrefix)),
    getNodeContentClass(node, filename, editorType),
    inputs)
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


function compileNode(node, nodeFunctionPrefix, nodesById, filename, editorType) {
  let compiledNodeTree = convertToCompiledNodeTree(node, 0, nodeFunctionPrefix, nodesById, filename, editorType)
  let compiledNodes = compiledNodeTree.flatten()
  let source = combineCompiledNodes(compiledNodes, nodeFunctionPrefix)
  return source
}

function getFileOutputNode(filename) {
  let fileData = FileManager.loadFileState(filename)
  let outputNode = null
  for (let node of fileData.nodes) {
    if (node.type.endsWith('Output')) {
      if (outputNode == null) {
        outputNode = node
      }
      else {
        ErrorManager.error('Multiple output nodes in ' + filename)
      }
    }
  }
  if (outputNode) {
    return outputNode
  }
  else {
    ErrorManager.error('No output node in ' + filename)
  }
}

function getNodesById(filename) {
  let fileData = FileManager.loadFileState(filename)
  let nodesById = {}

  for (let node of fileData.nodes) {
    nodesById[node.id] = node
  }

  return nodesById
}

function compileFile(filename, nodeFunctionPrefix) {
  let editorType = FileManager.getFileTypeFromFilename(filename)
  let outputNode = getFileOutputNode(filename)
  let nodesById = getNodesById(filename)
  let compiledNodeTree = convertToCompiledNodeTree(outputNode, 0, nodeFunctionPrefix, nodesById, filename, editorType)
  let compiledNodes = compiledNodeTree.flatten()
  let source = combineCompiledNodes(compiledNodes, nodeFunctionPrefix)
  return source
}

function compile() {
  let sdf = compileFile('main.sdf', 'main_sdf')
  let shader = compileFile('main.shader', 'main_shader')

  return GLSL_BOILERPLATE_SOURCE
    .replace("$$SDF_NODE_FUNCTIONS$$", sdf.nodeFunctions)
    .replace("$$SDF_MAIN_FUNCTION_BODY$$", sdf.mainFunctionBody)
    .replace("$$SHADER_NODE_FUNCTIONS$$", shader.nodeFunctions)
    .replace("$$SHADER_MAIN_FUNCTION_BODY$$", shader.mainFunctionBody)
}

export {compile, compileFile}
