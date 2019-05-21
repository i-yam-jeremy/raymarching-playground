import React from 'react'
import NodeEditorType from '../../node-editor-type.js'

class Rotation extends React.Component {

  compile(methodName) {
    return `
      vec3 ${methodName}(vec3 r, vec3 p) {
        mat3 xAxis = mat3(
          1,         0,        0,
          0,  cos(r.x), sin(r.x),
          0, -sin(r.x), cos(r.x)
        );
        mat3 yAxis = mat3(
          cos(r.y),  0, -sin(r.y),
                 0,  1,         0,
          sin(r.y),  0,  cos(r.y)
        );
        mat3 zAxis = mat3(
           cos(r.z), sin(r.z), 0,
          -sin(r.z), cos(r.z), 0,
                  0,        0, 1
        );
        return p*xAxis*yAxis*zAxis;
      }`
  }

  render() {
    return (
        <div>
        </div>
    )
  }
}

Rotation.inputs = [
  {type: 'vec3', name: 'rotation'},
  {type: 'vec3', name: 'p'}
]

Rotation.outputType = 'vec3'

Rotation.title = 'Rotation'

Rotation.editorTypes = [NodeEditorType.SDF, NodeEditorType.SHADER]

export default Rotation
