import React from 'react'
import NodeEditorType from '../../node-editor-type.js'

class SDFOutput extends React.Component {

  compile(methodName) {
    return `
      float ${methodName}(float distance) {
        return distance;
      }`
  }

  render() {
    return (
        <div>
        </div>
    )
  }

}

SDFOutput.inputs = [{type: 'float', name: 'distance'}]

SDFOutput.outputType = null

SDFOutput.title = 'SDF Output'

SDFOutput.editorTypes = [NodeEditorType.SDF]

export default SDFOutput
