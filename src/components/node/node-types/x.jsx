import React from 'react'
import NodeEditorType from '../node-editor-type.js'

class X extends React.Component {

  compile(methodName) {
    return `
      float ${methodName}(vec3 v) {
        return v.x;
      }`
  }

  render() {
    return (
        <div>
        </div>
    )
  }
}

X.inputs = [
  {type: 'vec3', name: 'v'}
]

X.outputType = 'float'

X.title = 'X'

X.editorTypes = [NodeEditorType.SDF, NodeEditorType.SHADER]

export default X
