import React from 'react'
import ReactDOM from 'react-dom'
import LineManager from './line-manager.jsx'

export default class Output extends React.Component {

  getLeftOffset() {
    return this.props.parentWidth - 25/2
  }

  getTopOffset() {
    return this.props.parentHeight/2 - 10
  }

  onMouseUp(e) {
    if (LineManager.isLineInProgress()) {
      let input = LineManager.getLineInProgressInput()
      input.onConnectWithOutput(this)
      this.props.parent.onOutputConnectedToInput(input)
      let bounds = ReactDOM.findDOMNode(this).getBoundingClientRect()
      input.onConnectedOutputMoved(bounds.left, bounds.top)
      //LineManager.endLine()
    }
  }

  render() {
    return (
        <div onMouseUp={this.onMouseUp.bind(this)} style={{backgroundColor: '#555555', color: '#FFFFFF', width: '16px', height: '16px', borderRadius: '16px', border: '2px solid #FFA500', position: 'absolute', left: this.getLeftOffset() + 'px', top: this.getTopOffset() + 'px', margin: '0px', padding: '0px'}}>
        </div>
    )
  }
}
