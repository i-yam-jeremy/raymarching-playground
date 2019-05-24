import React from 'react'
import Tooltip from 'rc-tooltip'
import Slider, { Handle } from 'rc-slider'
import 'rc-slider/assets/index.css'

export default class MaxStepSlider extends React.Component {

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
      )
    }

    return (
      <div>
        <div style={{height: '40px'}}>
          <Slider ref="maxStepsSlider" onAfterChange={() => this.props.setMaxSteps(Math.pow(2,this.refs.maxStepsSlider.state.value))}
            min={0} max={12} defaultValue={Math.log2(this.props.currentMaxSteps)} handle={handle}
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
      </div>
    )
  }

}
