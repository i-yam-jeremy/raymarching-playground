import React from 'react'
import NodeEditorType from '../node-editor-type.js'

class Sphere extends React.Component {

  compile(methodName) {
    return `
      float ${methodName}(float radius, vec3 p) {
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

Sphere.inputs = [
  {type: 'float', name: 'radius'},
  {type: 'vec3', name: 'p'}
]

Sphere.outputType = 'float'

Sphere.title = 'Sphere'

Sphere.editorTypes = [NodeEditorType.SDF]

export default Sphere
