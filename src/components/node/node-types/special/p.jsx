import React from 'react'
import NodeEditorType from '../../node-editor-type.js'

class P extends React.Component {

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

P.inputs = []

P.outputType = 'vec3'

P.title = 'P'

P.specialInputs = ['p']

P.editorTypes = [NodeEditorType.SDF, NodeEditorType.SHADER]

export default P
