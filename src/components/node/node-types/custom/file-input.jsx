import React from 'react'
import NodeEditorType from '../../node-editor-type.js'

function createFileInput(input) {
  class FileInput extends React.Component {

    compile(methodName) {
      return `
      ${input.type} ${methodName}(${input.type} value) {
        return value;
      }`
    }

    render() {
      return (
          <div>
          </div>
      )
    }

  }

  FileInput.inputs = []

  FileInput.outputType = input.type

  FileInput.title = input.name

  FileInput.specialInputs = [input.name]

  FileInput.editorTypes = [NodeEditorType.SDF, NodeEditorType.SHADER]

  return FileInput
}

export default createFileInput
