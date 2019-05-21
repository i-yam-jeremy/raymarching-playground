import React from 'react'
import RenderModes from './render-modes.js'
import Tooltip from 'rc-tooltip'
import Slider, { Handle } from 'rc-slider'
import 'rc-slider/assets/index.css'

function capitalize(str) {
  return str[0].toUpperCase() + str.substring(1).toLowerCase()
}

function roundNumber(n, decimalPlaces) {
  let m = Math.pow(10,decimalPlaces)
  return parseFloat(Math.round(n*m)/m).toFixed(decimalPlaces);
}

export default class RenderHUD extends React.Component {

  render() {

    const handle = (props) => {
      const { value, dragging, index, ...restProps } = props;
      return (
        <Tooltip
          prefixCls="rc-slider-tooltip"
          overlay={Math.pow(2, value)}
          visible={dragging}
          placement="top"
          key={index}
        >
          <Handle value={value} {...restProps} />
        </Tooltip>
      );
    };

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
          <p>Time: <span onClick={this.props.toggleTimePlaying} style={{fontWeight: '900'}}>{this.props.timePlaying ? '||' : '▶'}</span>{roundNumber(this.props.time, 1)}</p>
          <div style={{height: '40px'}}>
            <Slider ref="maxStepsSlider" onAfterChange={() => this.props.setMaxSteps(Math.pow(2,this.refs.maxStepsSlider.state.value))}
              min={0} max={12} defaultValue={6} handle={handle}
              trackStyle={{ backgroundColor: '#666666', height: 5 }}
              handleStyle={{
                borderColor: '#444444',
                height: 14,
                width: 14,
                marginLeft: -14,
                marginTop: -5,
                backgroundColor: '#222222',
              }}
              railStyle={{ backgroundColor: '#333333', height: 5 }}
            />
          </div>
          <p>FPS: {Math.round(this.props.fps)}</p>
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
