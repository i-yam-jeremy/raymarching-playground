import React from 'react'
import RenderModes from '../render-modes.js'
import Mode from './mode.jsx'
import Time from './time.jsx'
import MaxStepInput from './max-step-input.jsx'
import FPS from './fps.jsx'
import StepGradient from './step-gradient.jsx'

export default class RenderHUD extends React.Component {

  render() {
    return (
      <div>
        <div className="render-hud">
          <div className="render-hud-titlebar"></div>
          <Mode mode={this.props.mode} onModeChange={this.props.onModeChange} />
          <Time time={this.props.time} timePlaying={this.props.timePlaying} toggleTimePlaying={this.props.toggleTimePlaying} restartTime={this.props.restartTime} />
          <MaxStepInput setMaxSteps={this.props.setMaxSteps} currentMaxSteps={this.props.maxSteps} />
          <FPS fps={this.props.fps} />
        </div>
        {this.props.mode == RenderModes.STEPS ? (
          <StepGradient maxSteps={this.props.maxSteps} />
        ) : null}
      </div>
    )
  }

}
