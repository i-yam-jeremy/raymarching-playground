import React from 'react'
import RenderModes from '../render-modes.js'

function capitalize(str) {
  return str[0].toUpperCase() + str.substring(1).toLowerCase()
}

export default class Mode extends React.Component {

  render() {
    return (
      <div>
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
