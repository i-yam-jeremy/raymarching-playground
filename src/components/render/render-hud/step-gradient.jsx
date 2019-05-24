import React from 'react'

export default class StepGradient extends React.Component {

  render() {
    return (
      <div>
        <div className="render-hud-step-gradient-container">
          <div className="render-hud-step-gradient">
            <div className="render-hud-step-gradient-number-left">0</div>
            <div className="render-hud-step-gradient-number-middle">{this.props.maxSteps/2}</div>
            <div className="render-hud-step-gradient-number-right">{this.props.maxSteps}</div>
          </div>
        </div>
      </div>
    )
  }

}
