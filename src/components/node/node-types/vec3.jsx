import React from 'react'
import NodeEditorType from '../node-editor-type.js'

class Vec3 extends React.Component {

  compile(methodName) {
    return `
      vec3 ${methodName}(float x, float y, float z) {
        return vec3(x, y, z);
      }`
  }

  render() {
    return (
        <div>
        </div>
    )
  }
}

Vec3.inputs = [
  {type: 'float', name: 'x'},
  {type: 'float', name: 'y'},
  {type: 'float', name: 'z'}
]

Vec3.outputType = 'vec3'

Vec3.title = 'Vec3'

Vec3.editorTypes = [NodeEditorType.SDF, NodeEditorType.SHADER]

export default Vec3
