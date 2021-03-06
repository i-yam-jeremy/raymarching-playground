import React from 'react'
import NodeEditorType from '../../node-editor-type.js'

/*
  Implemented from https://iquilezles.org/www/articles/distfunctions/distfunctions.htm
*/
class SmoothUnion extends React.Component {

  compile(methodName) {
    return `
      float ${methodName}(float d1, float d2, float k) {
        float h = clamp( 0.5 + 0.5*(d2-d1)/k, 0.0, 1.0 );
        return mix( d2, d1, h ) - k*h*(1.0-h);
      }`
  }

  render() {
    return (
        <div>
        </div>
    )
  }
}

SmoothUnion.inputs = [
  {type: 'float', name: 'd1'},
  {type: 'float', name: 'd2'},
  {type: 'float', name: 'k'}
]

SmoothUnion.outputType = 'float'

SmoothUnion.title = 'Smooth Union'

SmoothUnion.editorTypes = [NodeEditorType.SDF]

export default SmoothUnion
