import React from 'react'
import RenderModes from './render-modes.js'

function capitalize(str) {
  return str[0].toUpperCase() + str.substring(1).toLowerCase()
}


export default class RenderHUD extends React.Component {

  render() {
    return (
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

      </div>
    )
  }

}
