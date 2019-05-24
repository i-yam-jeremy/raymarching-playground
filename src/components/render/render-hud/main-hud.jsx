import React from 'react'
import RenderModes from '../render-modes.js'
import Mode from './mode.jsx'
import Time from './time.jsx'
import MaxStepSlider from './max-step-slider.jsx'
import FPS from './fps.jsx'
import StepGradient from './step-gradient.jsx'

export default class RenderHUD extends React.Component {

  render() {
    return (
      <div>
        <div className="render-hud">
          <h4>Render Options</h4>
          <Mode onModeChange={this.props.onModeChange} />
          <Time time={this.props.time} timePlaying={this.props.timePlaying} toggleTimePlaying={this.props.toggleTimePlaying} restartTime={this.props.restartTime} />
          <MaxStepSlider setMaxSteps={this.props.setMaxSteps} currentMaxSteps={this.props.maxSteps} />
          <FPS fps={this.props.fps} />
        </div>
        {this.props.mode == RenderModes.STEPS ? (
          <StepGradient maxSteps={this.props.maxSteps} />
        ) : null}
      </div>
    )
  }

}
