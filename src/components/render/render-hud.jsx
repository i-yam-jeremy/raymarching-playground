import React from 'react'
import RenderModes from './render-modes.js'

function capitalize(str) {
  return str[0].toUpperCase() + str.substring(1).toLowerCase()
}

function numberToTwoDecimalPlacesString(n) {
  return parseFloat(Math.round(n*10)/10).toFixed(1);
}

export default class RenderHUD extends React.Component {

  render() {
    return (
      <div>
        <div className="render-hud">
          <h4>Render Options</h4>
          Mode:
            <form>
              {Object.keys(RenderModes).map(mode =>
                <div key={mode}>
                  <input name="render-mode" type="radio" id={'render-mode-' + mode} value={RenderModes[mode]} onChange={this.props.onModeChange} />
                  <label htmlFor={'render-mode-' + mode}>{capitalize(mode)}</label>
                </div>
              )}
            </form>
          <p>Time: {numberToTwoDecimalPlacesString(this.props.time)}</p>
        </div>
        {this.props.mode == RenderModes.STEPS ? (
          <div className="render-hud-step-gradient-container">
            <div className="render-hud-step-gradient">
              <div className="render-hud-step-gradient-number-left">0</div>
              <div className="render-hud-step-gradient-number-middle">{this.props.maxSteps/2}</div>
              <div className="render-hud-step-gradient-number-right">{this.props.maxSteps}</div>
            </div>
          </div>
        ) : null}
      </div>
    )
  }

}
