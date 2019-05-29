import React from 'react'

export default class StepGradient extends React.Component {

  render() {
    return (
      <div>
        <div className="step-gradient-container">
          <div className="step-gradient">
            <div className="number-left">0</div>
            <div className="number-middle">{this.props.maxSteps/2}</div>
            <div className="number-right">{this.props.maxSteps}</div>
          </div>
        </div>
      </div>
    )
  }

}
