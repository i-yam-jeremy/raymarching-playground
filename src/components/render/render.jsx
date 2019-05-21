import React from 'react'
import ReactDOM from 'react-dom'
import { Shaders, Node, GLSL } from 'gl-react'
import { Surface } from 'gl-react-dom'
import RenderModes from './render-modes.js'
import RenderHUD from './render-hud.jsx'

const TAB_HEIGHT = 39
const CAMERA_SPEED = 4 // radians/second
const ZOOM_SPEED = 1/100 // scroll units / scene unit
const MAX_RENDER_DISTANCE = 75

const DEFAULT_SHADER_SOURCE = `
  precision highp float;

  varying vec2 uv;
  uniform vec2 u_Resolution;
  uniform float u_Time;
  uniform float u_Camera_Distance;
  uniform vec2 u_Camera_Rotation;

  void main() {
    float ignored = u_Time*u_Resolution.x > 0.0 ? 0.0 : 0.0; // just to not show warnings of unused uniforms
    gl_FragColor = vec4(uv.x, uv.y, 0.5 + ignored, 1.0);
  }`

export default class Render extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight-TAB_HEIGHT,
      time: 0.0,
      cameraDistance: 2,
      cameraRotation: [0, -Math.PI/4],
      renderMode: RenderModes.STANDARD,
      maxSteps: 64,
      shader: Shaders.create({shader: {frag: DEFAULT_SHADER_SOURCE}}).shader
    }

    window.addEventListener('resize', () => {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight-TAB_HEIGHT
      })
    })

    this.keysDown = {}
    window.addEventListener('keydown', (e) => {
      this.keysDown[e.keyCode] = true
    })
    window.addEventListener('keyup', (e) => {
      this.keysDown[e.keyCode] = false
    })

    this.lastUpdateTime = Date.now()
    this.loop = null
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this).addEventListener('wheel', (e) => {
      this.setState({
        cameraDistance: this.state.cameraDistance + e.deltaY*ZOOM_SPEED
      })
    })
    this.timeLoop()
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.loop)
  }

  getNewCameraPos(cameraRotation, keysDown, deltaTime) {
    let deltaTheta = CAMERA_SPEED*deltaTime
    if (keysDown[37]) {
      cameraRotation[0] -= deltaTheta
    }
    if (keysDown[39]) {
      cameraRotation[0] += deltaTheta
    }
    if (keysDown[38]) {
      cameraRotation[1] += deltaTheta
    }
    if (keysDown[40]) {
      cameraRotation[1] -= deltaTheta
    }

    return cameraRotation
  }

  timeLoop() {
    let now = Date.now()


    let deltaTime = (now - this.lastUpdateTime) / 1000
    let cameraRotation = this.getNewCameraPos(this.state.cameraRotation, this.keysDown, deltaTime)
    this.setState({
      time: this.state.time + deltaTime,
      cameraRotation: cameraRotation
    })

    this.lastUpdateTime = now
    this.loop = requestAnimationFrame(this.timeLoop.bind(this))
  }

  setShaderSource(source) {
    const shaders = Shaders.create({
      shader: {
        frag: source
      }
    })
    this.setState({
      shader: shaders.shader
    })
  }

  onModeChange(e) {
    let renderModeValue = parseInt(e.target.value)
    this.setState({
      renderMode: renderModeValue
    })
  }

  render() {
    let uniforms = {
      u_Resolution: [this.state.width, this.state.height],
      u_Time: this.state.time,
      u_CameraDistance: this.state.cameraDistance,
      u_CameraRotation: this.state.cameraRotation,
      u_MaxRenderDistance: MAX_RENDER_DISTANCE,
      u_RenderMode: this.state.renderMode,
      u_MaxSteps: this.state.maxSteps
    }
    return (
      <div>
        <RenderHUD onModeChange={this.onModeChange.bind(this)} mode={this.state.renderMode} maxSteps={this.state.maxSteps} />
        <Surface width={this.state.width} height={this.state.height}>
          <Node shader={this.state.shader} uniforms={uniforms} />
        </Surface>
      </div>
    )
  }

}
