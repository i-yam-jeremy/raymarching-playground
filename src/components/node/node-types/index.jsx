import Sphere from './sphere.jsx'
import FloatConstant from './float-constant.jsx'
import Vec3Constant from './vec3-constant.jsx'
import Time from './time.jsx'
import P from './p.jsx'
import Normal from './normal.jsx'
import LightDir from './light-dir.jsx'
import SDFOutput from './sdf-output.jsx'
import ShaderOutput from './shader-output.jsx'
import Diffuse from './diffuse.jsx'

const NODE_TYPES = [
  Sphere,
  FloatConstant,
  Vec3Constant,
  Time,
  P,
  Normal,
  LightDir,
  SDFOutput,
  ShaderOutput,
  Diffuse
]

export default function getNodeTypes(editorType) {
  return NODE_TYPES.filter(type => type.editorTypes.indexOf(editorType) != -1)
}
