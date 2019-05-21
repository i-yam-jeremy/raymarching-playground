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
        <p>Mode:
          <select className="node-content-field" onChange={this.props.onModeChange}>
            {Object.keys(RenderModes).map(mode =>
              <option key={mode} value={RenderModes[mode]}>{capitalize(mode)}</option>
            )}
          </select>
        </p>
      </div>
    )
  }

}
