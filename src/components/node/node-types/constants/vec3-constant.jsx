import React from 'react'
import NodeEditorType from '../../node-editor-type.js'

class Vec3Constant extends React.Component {

  constructor(props) {
    super(props)

    this.x = 0
    this.y = 0
    this.z = 0
  }

  compile(methodName) {
    return `
      vec3 ${methodName}() {
        return vec3(${this.x}, ${this.y}, ${this.z});
      }`
  }

  render() {
    return (
        <div>
          <p>X: <input ref="x" type="number" step="any" className="field" onChange={(e) => this.x = e.target.value, this.props.onContentChanged()} /></p>
          <p>Y: <input ref="y" type="number" step="any" className="field" onChange={(e) => this.y = e.target.value, this.props.onContentChanged()} /></p>
          <p>Z: <input ref="z" type="number" step="any" className="field" onChange={(e) => this.z = e.target.value, this.props.onContentChanged()} /></p>
        </div>
    )
  }

  getSaveState() {
    return {
      x: this.x,
      y: this.y,
      z: this.z
    }
  }

  loadState(state) {
    this.x = state.x
    this.y = state.y
    this.z = state.z
    if (this.refs.x) {
      this.refs.x.value = state.x
    }
    if (this.refs.y) {
      this.refs.y.value = state.y
    }
    if (this.refs.z) {
      this.refs.z.value = state.z
    }
  }
}

Vec3Constant.inputs = []

Vec3Constant.outputType = 'vec3'

Vec3Constant.title = 'Vec3 Constant'

Vec3Constant.editorTypes = [NodeEditorType.SDF, NodeEditorType.SHADER]

export default Vec3Constant
