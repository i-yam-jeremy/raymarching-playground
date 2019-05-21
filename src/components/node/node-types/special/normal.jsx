import React from 'react'
import NodeEditorType from '../../node-editor-type.js'

class Normal extends React.Component {

  compile(methodName) {
    return `
      vec3 ${methodName}(vec3 normal) {
        return normal;
      }`
  }

  render() {
    return (
        <div>
        </div>
    )
  }

}

Normal.inputs = []

Normal.outputType = 'vec3'

Normal.title = 'Normal'

Normal.specialInputs = ['normal']

Normal.editorTypes = [NodeEditorType.SHADER]

export default Normal
