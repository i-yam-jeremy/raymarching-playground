import React from 'react'
import NodeEditorType from '../node-editor-type.js'

class Time extends React.Component {

  compile(methodName) {
    return `
      float ${methodName}() {
        return u_Time;
      }`
  }

  render() {
    return (
        <div>
        </div>
    )
  }
}

Time.inputs = []

Time.outputType = 'float'

Time.title = 'Time'

Time.editorTypes = [NodeEditorType.SDF, NodeEditorType.SHADER]

export default Time
