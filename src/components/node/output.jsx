import React from 'react'
import ReactDOM from 'react-dom'
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
    return (
        <div className="node-output-circle" onMouseUp={this.onMouseUp.bind(this)}>
        </div>
    )
  }
}
