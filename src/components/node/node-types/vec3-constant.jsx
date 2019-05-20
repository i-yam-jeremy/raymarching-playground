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

  getSaveState() {
    return {
      x: this.refs.x.value,
      y: this.refs.y.value,
      z: this.refs.z.value
    }
  }

  loadState(state) {
    this.refs.x.value = state.x
    this.refs.y.value = state.y
    this.refs.z.value = state.z
  }
}

Vec3Constant.inputs = []

Vec3Constant.outputType = 'vec3'

Vec3Constant.title = 'Vec3 Constant'

Vec3Constant.editorTypes = [NodeEditorType.SDF, NodeEditorType.SHADER]

export default Vec3Constant
