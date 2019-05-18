import React from 'react'
import NodeEditorType from '../node-editor-type.js'

class Diffuse extends React.Component {

  compile(methodName) {
    return `
      vec3 ${methodName}(vec3 color, vec3 lightDir, vec3 normal) {
        return length(p) - radius;
      }`
  }

  render() {
    return (
        <div>
        </div>
    )
  }
}

Diffuse.inputs = [
  {type: 'vec3', name: 'color'},
  {type: 'vec3', name: 'lightDir'},
  {type: 'vec3', name: 'normal'}
]

Diffuse.outputType = 'vec3'

Diffuse.title = 'Diffuse'

Diffuse.editorTypes = [NodeEditorType.SHADER]

export default Diffuse
