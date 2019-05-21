import React from 'react'
import NodeEditorType from '../../node-editor-type.js'

/*
  Implemented from https://iquilezles.org/www/articles/distfunctions/distfunctions.htm
*/
class Box extends React.Component {

  compile(methodName) {
    return `
      float ${methodName}(vec3 bounds, vec3 p) {
        vec3 d = abs(p) - bounds;
        return length(max(d,0.0))
                    + min(max(d.x,max(d.y,d.z)),0.0);
      }`
  }

  render() {
    return (
        <div>
        </div>
    )
  }
}

Box.inputs = [
  {type: 'vec3', name: 'bounds'},
  {type: 'vec3', name: 'p'}
]

Box.outputType = 'float'

Box.title = 'Box'

Box.editorTypes = [NodeEditorType.SDF]

export default Box
