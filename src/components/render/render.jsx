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

  constructor(props) {
    super(props)

    this.state = {
      width: window.innerWidth/2,
      height: window.innerHeight
    }

    window.addEventListener('resize', () => {
      this.setState({
        width: window.innerWidth/2,
        height: window.innerHeight
      })
    })
  }

  render() {
    return (
      <Surface width={this.state.width} height={this.state.height}>
        <Node shader={shaders.helloBlue} uniforms={{ blue: 0.5 }} />
      </Surface>
    )
  }

}
