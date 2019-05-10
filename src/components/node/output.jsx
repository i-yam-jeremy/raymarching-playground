import React from 'react'
import classnames from 'classnames'
import LineManager from './line-manager.jsx'

export default class Output extends React.Component {

  constructor(props) {
    super(props)

    this.props.parent.setOutputComponent(this)
  }

  onMouseUp(e) {
    if (LineManager.isLineInProgress()) {
      let input = LineManager.getLineInProgressInput()
      input.onConnectWithOutput(this)
      this.props.parent.onOutputConnectedToInput(input)
      //LineManager.endLine()
    }
  }

  render() {
    const circleClassNames = classnames('node-output-circle', 'node-input-output-circle-' + this.props.outputType)
    return (
        <div className={circleClassNames} onMouseUp={this.onMouseUp.bind(this)}>
        </div>
    )
  }
}
