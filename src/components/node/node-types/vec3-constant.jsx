import React from 'react'
import NodeEditorType from '../node-editor-type.js'

class Vec3Constant extends React.Component {

  compile(methodName) {
    return `
      vec3 ${methodName}() {
        return vec3(${this.refs.x.value}, ${this.refs.y.value}, ${this.refs.z.value});
      }`
  }

  render() {
    return (
        <div>
          <p>X: <input ref="x" type="number" step="any" /></p>
          <p>Y: <input ref="y" type="number" step="any" /></p>
          <p>Z: <input ref="z" type="number" step="any" /></p>
        </div>
    )
  }
}

Vec3Constant.inputs = []

Vec3Constant.outputType = 'vec3'

Vec3Constant.title = 'Vec3 Constant'

Vec3Constant.editorTypes = [NodeEditorType.SDF, NodeEditorType.SHADER]

export default Vec3Constant
