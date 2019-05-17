import React from 'react'
import ReactDOM from 'react-dom'
import clickDrag from 'react-clickdrag'
import classnames from 'classnames'
import LineManager from './line-manager.jsx'

class PreClickDragInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      x: 0,
      y: 0
    }

    this.connectedOutput = null

    this.props.parent.setInputComponent(this.props.inputName, this)
  }

  getLineRotation() {
    return (180/Math.PI) * Math.atan2(this.state.y, this.state.x)
  }

  getLineLength() {
    return Math.sqrt(this.state.x*this.state.x + this.state.y*this.state.y)
  }

  onConnectedOutputMoved(deltaX, deltaY) {
    this.setState({
      x: this.state.x + deltaX,
      y: this.state.y + deltaY
    })
  }

  updateLineConnectionPosition(deltaX, deltaY) {
    if (this.connectedOutput) {
      this.setState({
        x: this.state.x - deltaX,
        y: this.state.y - deltaY
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataDrag.isMouseDown) {
      if (!LineManager.isLineInProgress()) {
        if (this.connectedOutput) {
          this.connectedOutput.props.parent.inputConnection = null
          this.connectedOutput = null
        }
        LineManager.startLine(this)
      }
      this.setState({
        x: nextProps.dataDrag.moveDeltaX,
        y: nextProps.dataDrag.moveDeltaY
      })
    }
    else {
      if (!this.connectedOutput) {
        this.setState({
          x: 0,
          y: 0
        })
        LineManager.endLine()
      }
    }
  }

  onConnectWithOutput(output) {
    let outputBounds = ReactDOM.findDOMNode(output).getBoundingClientRect()
    let thisBounds = ReactDOM.findDOMNode(this).getBoundingClientRect()
    this.setState({
      x: outputBounds.x - thisBounds.x - 8,
      y: outputBounds.y - thisBounds.y - 8,
    })
    this.connectedOutput = output
  }

  getConnectingLinePath() {
    let startPoint, endPoint

    if (Math.sign(this.state.x) == Math.sign(this.state.y)) {
      startPoint = {x: 0, y: 0}
      endPoint = {x: Math.abs(this.state.x), y: Math.abs(this.state.y)}
    }
    else {
      startPoint = {x: 0, y: Math.abs(this.state.y)}
      endPoint = {x: Math.abs(this.state.x), y: 0}
    }

    startPoint.y += 3
    endPoint.y += 3

    return `M${startPoint.x},${startPoint.y} C${endPoint.x},${startPoint.y} ${startPoint.x},${endPoint.y} ${endPoint.x},${endPoint.y}`
  }

  render() {
    const circleClassNames = classnames('node-input-circle', 'node-input-output-circle-' + this.props.inputType)
    return (
        <div className="noselect">
          <div className={circleClassNames}>
            <span className="tooltip">{this.props.inputType}</span>
            <div className="svg-connecting-line-container" style={{top: (Math.min(0, this.state.y) + 8) + 'px', left: (Math.min(0, this.state.x) + 8) + 'px'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width={Math.abs(this.state.x)+6} height={Math.abs(this.state.y)+6} preserveAspectRatio="xMidYMid meet">
                <path d={this.getConnectingLinePath()} stroke="#666666" strokeWidth={3} fill="none"/>
              </svg>
            </div>
          </div>
        </div>
    )
  }
}

const Input = clickDrag(PreClickDragInput)

export default Input
