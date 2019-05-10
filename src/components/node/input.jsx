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
      y: 0,
      connectedOutput: null
    }

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
    if (this.state.connectedOutput) {
      this.setState({
        x: this.state.x - deltaX,
        y: this.state.y - deltaY
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataDrag.isMouseDown) {
      if (!LineManager.isLineInProgress()) {
        LineManager.startLine(this)
      }
      this.setState({
        x: nextProps.dataDrag.moveDeltaX,
        y: nextProps.dataDrag.moveDeltaY
      })
    }
    else {
      if (!this.state.connectedOutput) {
        this.setState({
          x: 0,
          y: 0
        })
        //LineManager.endLine()
      }
    }
  }

  onConnectWithOutput(output) {
    let outputBounds = ReactDOM.findDOMNode(output).getBoundingClientRect()
    let thisBounds = ReactDOM.findDOMNode(this).getBoundingClientRect()
    this.setState({
      x: outputBounds.x - thisBounds.x,
      y: outputBounds.y - thisBounds.y,
      connectedOutput: output
    })
  }

  render() {
    const circleClassNames = classnames('node-input-circle', 'node-input-output-circle-' + this.props.inputType)
    return (
        <div className="noselect">
          <div className={circleClassNames}>
            <span className="tooltip">{this.props.inputType}</span>
            <div className="node-connecting-line" style={{width: this.getLineLength() + 'px', transform: 'rotate(' + this.getLineRotation() + 'deg)'}}></div>
          </div>
        </div>
    )
  }
}

const Input = clickDrag(PreClickDragInput)

export default Input
