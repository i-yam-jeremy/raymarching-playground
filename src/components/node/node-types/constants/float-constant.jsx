import React from 'react'
import NodeEditorType from '../../node-editor-type.js'

class FloatConstant extends React.Component {

  constructor(props) {
    super(props)

    this.value = 0
  }

  compile(methodName) {
    return `
      float ${methodName}() {
        return float(${this.value});
      }`
  }

  render() {
    return (
        <div>
          <input type="number" step="any" className="field" onChange={(e) => this.value = e.target.value} />
        </div>
    )
  }

  getSaveState() {
    return {
      value: this.value
    }
  }

  loadState(state) {
    this.value = state.value
  }
}

FloatConstant.inputs = []

FloatConstant.outputType = 'float'

FloatConstant.title = 'Float'

FloatConstant.editorTypes = [NodeEditorType.SDF, NodeEditorType.SHADER]

export default FloatConstant
