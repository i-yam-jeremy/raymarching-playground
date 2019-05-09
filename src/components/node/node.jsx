import React from 'react'
import ReactDOM from 'react-dom'
import Draggable from 'react-draggable'
import ReactResizeDetector from 'react-resize-detector';
import Input from './input.jsx'
import Output from './output.jsx'

import '../../stylesheets/node.sass'

export default class Node extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      width: null,
      height: null,
      inputConnection: null
    }

    this.inputComponents = {}
    this.outputComponent = null
    this.previousWidth = 0
    this.previousHeight = 0
  }

  onOutputConnectedToInput(input) {
    this.setState({
      inputConnection: input
    })
  }

  onDrag(e, data) {
    if (this.state.inputConnection) {
      let bounds = ReactDOM.findDOMNode(this.outputComponent).getBoundingClientRect()
      this.state.inputConnection.onConnectedOutputMoved(data.deltaX, data.deltaY)
    }

    for (let input of this.props.inputs) {
      this.inputComponents[input].updateLineConnectionPosition(data.deltaX, data.deltaY)
    }
  }

  setInputComponent(inputName, node) {
    this.inputComponents[inputName] = node
  }

  setOutputComponent(outputComponent) {
    this.outputComponent = outputComponent
  }

  onResize(width, height) {
    let deltaX = width - this.previousWidth
    let deltaY = height - this.previousHeight

    if (this.state.inputConnection) {
      let bounds = ReactDOM.findDOMNode(this.outputComponent).getBoundingClientRect()
      this.state.inputConnection.onConnectedOutputMoved(deltaX, deltaY/2) // deltaY/2 because output.topOffset = parentHeight/2 + constant
    }

    this.previousWidth = width
    this.previousHeight = height
  }

  render() {
    return (
      <Draggable
        handle=".node-handle"
        defaultPosition={{x: 0, y: 0}}
        position={null}
        onDrag={this.onDrag.bind(this)}>
        <div className="node">
          <div className="node-handle noselect">{this.props.title}</div>
          <div>
            {this.props.inputs.map((inputName, i) => <Input parent={this} key={'input-' + inputName} index={i} inputName={inputName} />)}
          </div>
          <Output parent={this} />
          <div className="node-content">
            <textarea rows="4" cols="50"></textarea>
          </div>
          <ReactResizeDetector handleWidth handleHeight onResize={this.onResize.bind(this)} />
        </div>
      </Draggable>
    )
  }
}
