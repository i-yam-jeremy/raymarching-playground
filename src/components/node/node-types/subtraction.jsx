import React from 'react'
import NodeEditorType from '../node-editor-type.js'

/*
  Implemented from https://iquilezles.org/www/articles/distfunctions/distfunctions.htm
*/
class Subtraction extends React.Component {

  compile(methodName) {
    return `
      float ${methodName}(float d1, float d2) {
        return max(-d1, d2);
      }`
  }

  render() {
    return (
        <div>
        </div>
    )
  }
}

Subtraction.inputs = [
  {type: 'float', name: 'd1'},
  {type: 'float', name: 'd2'}
]

Subtraction.outputType = 'float'

Subtraction.title = 'Subtraction'

Subtraction.editorTypes = [NodeEditorType.SDF]

export default Subtraction
