import React from 'react'
import FileManager from '../../../file-manager/file-manager.js'
import {compileFile} from '../../compiler/compiler.js'
import NodeEditorType from '../../node-editor-type.js'

function createCustomNode(filename) {
  let file = FileManager.loadFileState(filename)
  let editorType = FileManager.getFileTypeFromFilename(filename)

  class CustomNode extends React.Component {

    compile(methodName) {
      let file = FileManager.loadFileState(filename)
      let specialInputs
      if (editorType == NodeEditorType.SDF) {
        specialInputs = [{name: 'p', type: 'vec3'}]
      }
      else if (editorType == NodeEditorType.SHADER) {
        specialInputs = [{name: 'p', type: 'vec3'},
                         {name: 'lightDir', type: 'vec3'},
                         {name: 'normal', type: 'vec3'},
                         {name: 'rayDir', type: 'vec3'}]
      }
      let inputParamsStr = specialInputs
                               .concat(file.inputs)
                               .map(input => `${input.type} ${input.name}`)
                               .join(', ')
      let inputArgsStr = file.inputs
                             .map(input => input.name)
                             .join(', ')

      let compiledFileSource = compileFile(filename, methodName)

      return `
        ${compiledFileSource.nodeFunctions}

        ${file.outputType} ${methodName}(${inputParamsStr}) {
          ${compiledFileSource.mainFunctionBody}
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

  if (editorType == NodeEditorType.SDF) {
    CustomNode.specialInputs = ['p']
  }
  else if (editorType == NodeEditorType.SHADER) {
    CustomNode.specialInputs = ['p', 'lightDir', 'normal', 'rayDir']
  }

  CustomNode.editorTypes = [editorType]

  return CustomNode
}

export default createCustomNode
