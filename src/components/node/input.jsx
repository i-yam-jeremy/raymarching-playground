import React from 'react'
import ReactDOM from 'react-dom'
import clickDrag from 'react-clickdrag'
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

  getTopOffset() {
    return 25 + 25*this.props.index
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
      x: outputBounds.x - thisBounds.x + 18,
      y: outputBounds.y - thisBounds.y,
      connectedOutput: output
    })
  }

  render() {
    return (
        <div className="noselect">
          <div className="node-input-circle" style={{top: this.getTopOffset() + 'px'}}>
          </div>
          <div className="node-input-label" style={{top: this.getTopOffset() + 'px'}}>
            {this.props.inputName}
          </div>
          <div className="node-connecting-line" style={{top: (this.getTopOffset()+25/2) + 'px', width: this.getLineLength() + 'px', transform: 'rotate(' + this.getLineRotation() + 'deg)'}}></div>
        </div>
    )
  }
}

const Input = clickDrag(PreClickDragInput)

export default Input
