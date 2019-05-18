import React from 'react'
import NodeEditorType from '../node-editor-type.js'

class Y extends React.Component {

  compile(methodName) {
    return `
      float ${methodName}(vec3 v) {
        return v.y;
      }`
  }

  render() {
    return (
        <div>
        </div>
    )
  }
}

Y.inputs = [
  {type: 'vec3', name: 'v'}
]

Y.outputType = 'float'

Y.title = 'Y'

Y.editorTypes = [NodeEditorType.SDF, NodeEditorType.SHADER]

export default Y
