import React from 'react'
import NodeEditorType from '../../node-editor-type.js'

/*
  Implemented from https://iquilezles.org/www/articles/distfunctions/distfunctions.htm
*/
class Intersection extends React.Component {

  compile(methodName) {
    return `
      float ${methodName}(float d1, float d2) {
        return max(d1, d2);
      }`
  }

  render() {
    return (
        <div>
        </div>
    )
  }
}

Intersection.inputs = [
  {type: 'float', name: 'd1'},
  {type: 'float', name: 'd2'}
]

Intersection.outputType = 'float'

Intersection.title = 'Intersection'

Intersection.editorTypes = [NodeEditorType.SDF]

export default Intersection
