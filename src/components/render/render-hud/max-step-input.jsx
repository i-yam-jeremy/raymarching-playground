import React from 'react'

const MAX_STEP_VALUES = [16, 32, 64, 128, 256, 512, 1024]

export default class MaxStepInput extends React.Component {

  prev() {
    let i = MAX_STEP_VALUES.indexOf(this.props.currentMaxSteps)
    if (i == -1) {
      throw 'Current max step value not in MAX_STEP_VALUES: ' + this.props.currentMaxSteps
    }
    this.props.setMaxSteps(MAX_STEP_VALUES[i-1])
  }

  next() {
    let i = MAX_STEP_VALUES.indexOf(this.props.currentMaxSteps)
    if (i == -1) {
      throw 'Current max step value not in MAX_STEP_VALUES: ' + this.props.currentMaxSteps
    }
    this.props.setMaxSteps(MAX_STEP_VALUES[i+1])
  }

  getPrevButton() {
    return (
      <svg width={24} height={32} xmlns="http://www.w3.org/2000/svg">
        <polygon points="24,0 0,16 24,32" fill="#BBBBBB" />
      </svg>
    )
  }

  getNextButton() {
    return (
      <svg width={24} height={32} xmlns="http://www.w3.org/2000/svg">
        <polygon points="0,0 24,16 0,32" fill="#BBBBBB" />
      </svg>
    )
  }

  render() {
    return (
      <div className="render-hud-max-step-input-container">
        <div className="render-hud-max-step-input-control">
          {(MAX_STEP_VALUES.indexOf(this.props.currentMaxSteps) > 0) ?
            <div onClick={this.prev.bind(this)}>
              {this.getPrevButton()}
            </div>
            : null
          }
        </div>
        <div className="render-hud-max-step-input-value">
          {this.props.currentMaxSteps}
        </div>
        <div className="render-hud-max-step-input-control">
          {(MAX_STEP_VALUES.indexOf(this.props.currentMaxSteps) < MAX_STEP_VALUES.length-1) ?
            <div onClick={this.next.bind(this)}>
              {this.getNextButton()}
            </div>
            : null
          }
        </div>
      </div>
    )
  }

}
