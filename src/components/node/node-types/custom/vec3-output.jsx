import React from 'react'
import NodeEditorType from '../../node-editor-type.js'

class Vec3Output extends React.Component {

  compile(methodName) {
    return `
      vec3 ${methodName}(vec3 v) {
        return v;
      }`
  }

  render() {
    return (
        <div>
        </div>
    )
  }

}

Vec3Output.inputs = [{type: 'vec3', name: 'output'}]

Vec3Output.outputType = null

Vec3Output.title = 'Vec3 Output'

Vec3Output.editorTypes = [NodeEditorType.SHADER]

export default Vec3Output
