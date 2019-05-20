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
import Translation from './translation.jsx'
import X from './x.jsx'
import Y from './y.jsx'
import Z from './z.jsx'
import Vec3 from './vec3.jsx'

const NODE_TYPES = {
  Primitives: [Sphere],
  Shading: [Diffuse],
  Vector: [Translation, Vec3, X, Y, Z],
  Constants: [FloatConstant, Vec3Constant],
  Special: [Time, P, Normal, LightDir],
  Output: [SDFOutput, ShaderOutput]
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
