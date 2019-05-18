import Sphere from './sphere.jsx'
import FloatConstant from './float-constant.jsx'
import Time from './time.jsx'
import P from './p.jsx'
import SDFOutput from './sdf-output.jsx'
import ShaderOutput from './shader-output.jsx'
import Diffuse from './diffuse.jsx'

const NODE_TYPES = [
  Sphere,
  FloatConstant,
  Time,
  P,
  SDFOutput,
  ShaderOutput,
  Diffuse
]

export default function getNodeTypes(editorType) {
  return NODE_TYPES.filter(type => type.editorTypes.indexOf(editorType) != -1)
}
