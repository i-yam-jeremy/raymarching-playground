import React from 'react'
import NodeEditorType from '../../node-editor-type.js'

/*
  Implemented from https://iquilezles.org/www/articles/distfunctions/distfunctions.htm
*/
class Torus extends React.Component {

  compile(methodName) {
    return `
      float ${methodName}(float innerRadius, float outerRadius, vec3 p) {
        vec2 t = vec2(outerRadius, innerRadius);
        vec2 q = vec2(length(p.xz)-t.x,p.y);
        return length(q)-t.y;
      }`
  }

  render() {
    return (
        <div>
        </div>
    )
  }
}

Torus.inputs = [
  {type: 'float', name: 'innerRadius'},
  {type: 'float', name: 'outerRadius'},
  {type: 'vec3', name: 'p'}
]

Torus.outputType = 'float'

Torus.title = 'Torus'

Torus.editorTypes = [NodeEditorType.SDF]

export default Torus
