import React from 'react'
import NodeEditorType from '../../node-editor-type.js'

class FloatConstant extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      value: 0
    }
  }

  compile(methodName) {
    return `
      float ${methodName}() {
        return float(${this.value});
      }`
  }

  handleChange(e) {
    this.value = e.target.value
    this.props.onContentChanged()
  }

  render() {
    return (
        <div>
          <input ref="value" type="number" step="any" className="field" onChange={this.handleChange.bind(this)} />
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
    if (this.refs.value) {
      this.refs.value.value = state.value
    }
  }
}

FloatConstant.inputs = []

FloatConstant.outputType = 'float'

FloatConstant.title = 'Float'

FloatConstant.editorTypes = [NodeEditorType.SDF, NodeEditorType.SHADER]

export default FloatConstant
