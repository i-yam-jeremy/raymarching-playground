import PRIMITIVES from './primitives'
import OPERATIONS from './operations'
import SHADING from './shading'
import VECTOR from './vector'
import CONSTANTS from './constants'
import SPECIAL from './special'
import {createCustomNode, createFileInput, getFileOutputNode} from './custom'
import FileManager from '../../file-manager/file-manager.js'

const NODE_TYPES = {
  Primitives: PRIMITIVES,
  Operations: OPERATIONS,
  Shading: SHADING,
  Vector: VECTOR,
  Constants: CONSTANTS,
  Special: SPECIAL
}

export default function getNodeTypes(filename, editorType) {
  let obj = {}
  for (let category in NODE_TYPES) {
    let filteredTypes = NODE_TYPES[category].filter(type => type.editorTypes.indexOf(editorType) != -1)
    if (filteredTypes.length > 0) {
      obj[category] = filteredTypes
    }
  }
  let customNodes = FileManager.getFileList()
                             .filter(fileData => ['main.sdf', 'main.shader', filename].indexOf(fileData.name) == -1)
                             .map(fileData => createCustomNode(fileData.name))
                             .filter(type => type.editorTypes.indexOf(editorType) != -1)
  if (customNodes.length > 0) {
    obj['Custom'] = customNodes
  }

  let fileData = FileManager.loadFileState(filename)

  if (fileData.inputs.length > 0) {
    obj['Inputs'] = fileData.inputs.map(createFileInput)
  }

  obj['Output'] = [getFileOutputNode(fileData.outputType)]

  return obj
}
