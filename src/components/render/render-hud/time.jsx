import React from 'react'

function roundNumber(n, decimalPlaces) {
  let m = Math.pow(10,decimalPlaces)
  return parseFloat(Math.round(n*m)/m).toFixed(decimalPlaces);
}

export default class Time extends React.Component {

  render() {
    return (
      <div>
        <p>Time: <span onClick={this.props.restartTime}>◀</span><span onClick={this.props.toggleTimePlaying} style={{fontWeight: '900'}}>{this.props.timePlaying ? '||' : '▶'}</span>{roundNumber(this.props.time, 1)}</p>
      </div>
    )
  }

}
