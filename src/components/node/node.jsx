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
      this.inputComponents[input.name].updateLineConnectionPosition(data.deltaX, data.deltaY)
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
    const NodeContent = this.props.nodeContent
    return (
      <Draggable
        handle=".node-handle"
        defaultPosition={{x: 0, y: 0}}
        position={null}
        onDrag={this.onDrag.bind(this)}>
        <div className="node">
          <div className="node-handle">{this.props.title}</div>
          <div className="node-input-label-container">
            {this.props.inputs.map((input, i) => <p key={'input-label-' + input.name} className="node-input-label">{input.name}</p>)}
          </div>
          <div className="node-content">
            <NodeContent />
          </div>
          <div className="node-input-circle-container">
            {this.props.inputs.map((input, i) => <Input parent={this} key={'input-circle-' + input.name} index={i} inputName={input.name} inputType={input.type} />)}
          </div>
          <Output parent={this} outputType={this.props.outputType} />
          <ReactResizeDetector handleWidth handleHeight onResize={this.onResize.bind(this)} />
        </div>
      </Draggable>
    )
  }
}
