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

  onConnectedOutputMoved(x, y) {
    let bounds = ReactDOM.findDOMNode(this).getBoundingClientRect()
    this.setState({
      x: x-bounds.left+8,
      y: y-bounds.top-8
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
    this.setState({
      connectedOutput: output
    })
  }

  render() {
    return (
        <div className="noselect">
          <div style={{backgroundColor: '#555555', color: '#FFFFFF', width: '16px', height: '16px', borderRadius: '16px', border: '2px solid #FFA500', position: 'absolute', left: '-10px', top: this.getTopOffset() + 'px', margin: '0px', padding: '0px'}}>
          </div>
          <div style={{position: 'absolute', left: '16px', 'top': this.getTopOffset() + 'px', margin: '0px', padding: '0px'}}>
            {this.props.inputName}
          </div>
          <div style={{borderTop: '3px solid rgb(255, 165, 0)', position: 'absolute', left: '0px', top: (this.getTopOffset()+25/2) + 'px', width: this.getLineLength() + 'px', zIndex: -1, transform: 'rotate(' + this.getLineRotation() + 'deg)', transformOrigin: '0px 0px 0px'}}></div>
        </div>
    )
  }
}

const Input = clickDrag(PreClickDragInput)

export default Input
