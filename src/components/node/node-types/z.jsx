import React from 'react'
import NodeEditorType from '../node-editor-type.js'

class Z extends React.Component {

  compile(methodName) {
    return `
      float ${methodName}(vec3 v) {
        return v.z;
      }`
  }

  render() {
    return (
        <div>
        </div>
    )
  }
}

Z.inputs = [
  {type: 'vec3', name: 'v'}
]

Z.outputType = 'float'

Z.title = 'Z'

Z.editorTypes = [NodeEditorType.SDF, NodeEditorType.SHADER]

export default Z
