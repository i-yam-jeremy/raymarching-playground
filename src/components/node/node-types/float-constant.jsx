import React from 'react'
import NodeEditorType from '../node-editor-type.js'

class FloatConstant extends React.Component {

  compile(methodName) {
    return `
      float ${methodName}() {
        return float(${this.refs.value.value});
      }`
  }

  render() {
    return (
        <div>
          <input ref="value" type="number" step="any" />
        </div>
    )
  }
}

FloatConstant.inputs = []

FloatConstant.outputType = 'float'

FloatConstant.title = 'Float'

FloatConstant.editorTypes = [NodeEditorType.SDF, NodeEditorType.SHADER]

export default FloatConstant
