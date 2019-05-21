import React from 'react'
import NodeEditorType from '../../node-editor-type.js'

class Translation extends React.Component {

  compile(methodName) {
    return `
      vec3 ${methodName}(vec3 translation, vec3 p) {
        return p + translation;
      }`
  }

  render() {
    return (
        <div>
        </div>
    )
  }
}

Translation.inputs = [
  {type: 'vec3', name: 'translation'},
  {type: 'vec3', name: 'p'}
]

Translation.outputType = 'vec3'

Translation.title = 'Translation'

Translation.editorTypes = [NodeEditorType.SDF, NodeEditorType.SHADER]

export default Translation
