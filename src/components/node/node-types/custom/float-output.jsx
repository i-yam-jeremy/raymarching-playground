import React from 'react'
import NodeEditorType from '../../node-editor-type.js'

class FloatOutput extends React.Component {

  compile(methodName) {
    return `
      float ${methodName}(float f) {
        return f;
      }`
  }

  render() {
    return (
        <div>
        </div>
    )
  }

}

FloatOutput.inputs = [{type: 'float', name: 'output'}]

FloatOutput.outputType = null

FloatOutput.title = 'Float Output'

FloatOutput.editorTypes = [NodeEditorType.SDF]

export default FloatOutput
