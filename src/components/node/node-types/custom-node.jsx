import React from 'react'
import FileManager from '../../file-manager/file-manager.js'

function createCustomNode(filename) {
  let file = FileManager.loadFileState(filename)

  class CustomNode extends React.Component {

    compile(methodName) {
      let file = FileManager.loadFileState(filename)
      let inputParamsStr = file.inputs
                               .map(input => `${input.type} ${input.name}`)
                               .join(', ')
      let inputArgsStr = file.inputs
                             .map(input => input.name)
                             .join(', ')
      return `
        ${file.outputType} ${methodName}(${inputParamsStr}) {
          return ${filename.replace(".", "_")}(${inputArgsStr});
        }`
    }

    render() {
      return (
          <div>
          </div>
      )
    }
  }

  CustomNode.inputs = file.inputs

  CustomNode.outputType = file.outputType

  CustomNode.title = filename

  CustomNode.editorTypes = [FileManager.getFileTypeFromFilename(filename)]

  return CustomNode
}

export default createCustomNode
