import React from 'react'
import NodeEditorType from '../../node-editor-type.js'

/*
  Implemented from https://iquilezles.org/www/articles/distfunctions/distfunctions.htm
*/
class Union extends React.Component {

  compile(methodName) {
    return `
      float ${methodName}(float d1, float d2) {
        return min(d1, d2);
      }`
  }

  render() {
    return (
        <div>
        </div>
    )
  }
}

Union.inputs = [
  {type: 'float', name: 'd1'},
  {type: 'float', name: 'd2'}
]

Union.outputType = 'float'

Union.title = 'Union'

Union.editorTypes = [NodeEditorType.SDF]

export default Union
