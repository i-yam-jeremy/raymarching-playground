import React from 'react'
import { Shaders, Node, GLSL } from 'gl-react'
import { Surface } from 'gl-react-dom'

export default class Render extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      width: window.innerWidth/2,
      height: window.innerHeight,
      shaderSource: `
        precision highp float;
        varying vec2 uv;
        void main() {
          gl_FragColor = vec4(uv.x, uv.y, 0.5, 1.0);
        }`
    }

    window.addEventListener('resize', () => {
      this.setState({
        width: window.innerWidth/2,
        height: window.innerHeight
      })
    })
  }

  setShaderSource(source) {
    this.setState({
      shaderSource: source
    })
  }

  render() {
    const shaders = Shaders.create({
      shader: {
        frag: this.state.shaderSource
      }
    });
    return (
      <Surface width={this.state.width} height={this.state.height}>
        <Node shader={shaders.shader} uniforms={{}} />
      </Surface>
    )
  }

}
