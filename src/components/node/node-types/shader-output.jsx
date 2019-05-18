import React from 'react'
import NodeEditorType from '../node-editor-type.js'

class ShaderOutput extends React.Component {

  compile(methodName) {
    return `
      vec3 ${methodName}(vec3 color) {
        return color;
      }`
  }

  render() {
    return (
        <div>
        </div>
    )
  }

}

ShaderOutput.inputs = [{type: 'vec3', name: 'color'}]

ShaderOutput.outputType = null

ShaderOutput.title = 'Shader Output'

ShaderOutput.editorTypes = [NodeEditorType.SHADER]

export default ShaderOutput
