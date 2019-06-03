import PRIMITIVES from './primitives'
import OPERATIONS from './operations'
import SHADING from './shading'
import VECTOR from './vector'
import CONSTANTS from './constants'
import SPECIAL from './special'
import OUTPUT from './output'
import createCustomNode from './custom/custom-node.jsx'
import createFileInput from './custom/file-input.jsx'
import FileManager from '../../file-manager/file-manager.js'

const NODE_TYPES = {
  Primitives: PRIMITIVES,
  Operations: OPERATIONS,
  Shading: SHADING,
  Vector: VECTOR,
  Constants: CONSTANTS,
  Special: SPECIAL,
  Output: OUTPUT
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
    obj['File Inputs'] = fileData.inputs
                                 .map(input => createFileInput(input))
  }

  return obj
}
