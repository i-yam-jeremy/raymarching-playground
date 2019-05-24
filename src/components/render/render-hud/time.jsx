import React from 'react'

function roundNumber(n, decimalPlaces) {
  let m = Math.pow(10,decimalPlaces)
  return parseFloat(Math.round(n*m)/m).toFixed(decimalPlaces);
}

export default class Time extends React.Component {

  getRestartButton() {
    return (
      <svg width={24} height={32} xmlns="http://www.w3.org/2000/svg">
        <polygon points="24,0 0,16 24,32" fill="#BBBBBB" />
      </svg>
    )
  }

  getPlayButton() {
    return (
      <svg width={24} height={32} xmlns="http://www.w3.org/2000/svg">
        <polygon points="0,0 24,16 0,32" fill="#BBBBBB" />
      </svg>
    )
  }

  getPauseButton() {
    return (
      <svg width={24} height={32} xmlns="http://www.w3.org/2000/svg">
        <polygon points="2,0 8,0 8,32 2,32" fill="#BBBBBB" />
        <polygon points="16,0 22,0 22,32 16,32" fill="#BBBBBB" />
      </svg>
    )
  }

  render() {
    return (
      <div className="render-hud-time-container">
        <div className="render-hud-time-control" onClick={this.props.restartTime}>
          {this.getRestartButton()}
        </div>
        <div className="render-hud-time-control" onClick={this.props.toggleTimePlaying}>
          {this.props.timePlaying ? this.getPauseButton() : this.getPlayButton()}
        </div>
        <div className="render-hud-time-number">
          {roundNumber(this.props.time, 1)}
        </div>
      </div>
    )
  }

}
