import React from 'react'
import { Shaders, Node, GLSL } from 'gl-react'
import { Surface } from 'gl-react-dom'

const shaders = Shaders.create({
  helloBlue: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform float blue;
void main() {
  gl_FragColor = vec4(uv.x, uv.y, blue, 1.0);
}`
  }
});

export default class Render extends React.Component {

  render() {
    return (
      <Surface width={300} height={300}>
        <Node shader={shaders.helloBlue} uniforms={{ blue: 0.5 }} />
      </Surface>
    )
  }

}
