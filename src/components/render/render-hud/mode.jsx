import React from 'react'
import RenderModes from '../render-modes.js'

function capitalize(str) {
  return str[0].toUpperCase() + str.substring(1).toLowerCase()
}

export default class Mode extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedMode: this.props.mode
    }
  }

  setMode(modeKey) {
    this.setState({
      selectedMode: RenderModes[modeKey]
    })
    this.props.onModeChange(RenderModes[modeKey])
  }

  render() {
    return (
      <div className="render-hud-mode-option-container">
          {Object.keys(RenderModes).map(mode =>
            <div key={mode} className="render-hud-mode-option" onClick={() => this.setMode(mode)}>
              <div className={'render-hud-mode-option-radio-' + (this.state.selectedMode == RenderModes[mode] ? 'selected' : 'unselected')} />
              <div className="render-hud-mode-option-label">{capitalize(mode)}</div>
            </div>
          )}
      </div>
    )
  }

}
