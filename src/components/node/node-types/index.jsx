import PRIMITIVES from './primitives'
import OPERATIONS from './operations'
import SHADING from './shading'
import VECTOR from './vector'
import CONSTANTS from './constants'
import SPECIAL from './special'
import OUTPUT from './output'

const NODE_TYPES = {
  Primitives: PRIMITIVES,
  Operations: OPERATIONS,
  Shading: SHADING,
  Vector: VECTOR,
  Constants: CONSTANTS,
  Special: SPECIAL,
  Output: OUTPUT
}

export default function getNodeTypes(editorType) {
  let obj = {}
  for (let category in NODE_TYPES) {
    let filteredTypes = NODE_TYPES[category].filter(type => type.editorTypes.indexOf(editorType) != -1)
    if (filteredTypes.length > 0) {
      obj[category] = filteredTypes
    }
  }
  return obj
}
