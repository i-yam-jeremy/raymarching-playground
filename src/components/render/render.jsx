import React from 'react'
import { Shaders, Node, GLSL } from 'gl-react'
import { Surface } from 'gl-react-dom'

export default class Render extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      width: window.innerWidth/2,
      height: window.innerHeight,
      time: 0.0,
      shaderSource: `
        precision highp float;

        varying vec2 uv;
        uniform vec2 u_Resolution;
        uniform float u_Time;

        void main() {
          float ignored = u_Time*u_Resolution.x > 0.0 ? 0.0 : 0.0; // just to not show warnings of unused uniforms
          gl_FragColor = vec4(uv.x, uv.y, 0.5 + ignored, 1.0);
        }`
    }

    window.addEventListener('resize', () => {
      this.setState({
        width: window.innerWidth/2,
        height: window.innerHeight
      })
    })
  }

  componentDidMount() {
    let interval = 1000 / 60
    setInterval(() => {
      this.setState({
        time: this.state.time + interval/1000
      })
    }, interval)
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
        <Node shader={shaders.shader} uniforms={{u_Resolution: [this.state.width, this.state.height], u_Time: this.state.time}} />
      </Surface>
    )
  }

}
