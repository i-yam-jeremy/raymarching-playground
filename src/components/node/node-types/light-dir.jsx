import React from 'react'
import NodeEditorType from '../node-editor-type.js'

class LightDir extends React.Component {

  compile(methodName) {
    return `
      vec3 ${methodName}(vec3 p) {
        return p;
      }`
  }

  render() {
    return (
        <div>
        </div>
    )
  }

}

LightDir.inputs = []

LightDir.outputType = 'vec3'

LightDir.title = 'Light Dir'

LightDir.specialInputs = ['lightDir']

LightDir.editorTypes = [NodeEditorType.SHADER]

export default LightDir
