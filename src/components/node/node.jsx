import React from 'react'
import ReactDOM from 'react-dom'
import Draggable from 'react-draggable'
import ReactResizeDetector from 'react-resize-detector'
import Input from './input.jsx'
import Output from './output.jsx'

export default class Node extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      width: null,
      height: null
    }

    this.inputConnection = null
    this.inputComponents = {}
    this.outputComponent = null
    this.previousWidth = 0
    this.previousHeight = 0
    this.nodeContent = null
  }

  onOutputConnectedToInput(input) {
    this.inputConnection = input
  }

  onDrag(e, data) {
    if (this.inputConnection) {
      let bounds = ReactDOM.findDOMNode(this.outputComponent).getBoundingClientRect()
      this.inputConnection.onConnectedOutputMoved(data.deltaX, data.deltaY)
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

    if (this.inputConnection) {
      let bounds = ReactDOM.findDOMNode(this.outputComponent).getBoundingClientRect()
      this.inputConnection.onConnectedOutputMoved(deltaX, deltaY/2) // deltaY/2 because output.topOffset = parentHeight/2 + constant
    }

    this.previousWidth = width
    this.previousHeight = height
  }

  clearConnections() {
    if (this.inputConnection) {
      let inputName = this.inputConnection.props.inputName
      this.inputConnection.props.parent.inputComponents[inputName].connectedOutput = null
      this.inputConnection = null
    }

    for (let input of this.props.inputs) {
      let inputComponent = this.inputComponents[input.name]
      if (inputComponent.connectedOutput) {
        inputComponent.connectedOutput.props.parent.inputConnection = null
        inputComponent.connectedOutput = null
      }
    }
  }

  setNodeContent(nodeContent) {
    this.nodeContent = nodeContent
  }

  getSaveState() {
    let inputs = {}
    for (let input in this.inputComponents) {
      if (this.inputComponents[input].connectedOutput) {
        inputs[input] = this.inputComponents[input].connectedOutput.props.parent.props.nodeId
      }
      else {
        inputs[input] = null
      }
    }

    let transformStr = ReactDOM.findDOMNode(this).style.transform
    let transformStrSplit = transformStr.split('px, ')
    let x = parseFloat(transformStrSplit[0].split('(')[1])
    let y = parseFloat(transformStrSplit[1].split('px')[0])
    return {
      id: this.props.nodeId,
      x: x,
      y: y,
      output: (this.inputConnection ? this.inputConnection.props.parent.props.nodeId : null),
      inputs: inputs,
      type: this.props.nodeContent.name,
      content: (typeof this.nodeContent.getSaveState == 'function' ? this.nodeContent.getSaveState() : null)
    }
  }

  connectInput(inputName, nodeComponent) {
    let inputComponent = this.inputComponents[inputName]
    inputComponent.onConnectWithOutput(nodeComponent.outputComponent)
    nodeComponent.onOutputConnectedToInput(inputComponent)
  }

  render() {
    const NodeContent = this.props.nodeContent
    return (
      <Draggable
        handle=".node-handle"
        defaultPosition={{x: this.props.initialX, y: this.props.initialY}}
        position={null}
        onDrag={this.onDrag.bind(this)}>
        <div className="node">
          <div className="node-handle">{this.props.title + ' - ' + this.props.nodeId}</div>
          <div className="node-input-label-container">
            {this.props.inputs.map((input, i) => <p key={'input-label-' + input.name} className="node-input-label">{input.name}</p>)}
          </div>
          <div className="node-content">
            <NodeContent ref={this.setNodeContent.bind(this)} />
          </div>
          <div className="node-input-circle-container">
            {this.props.inputs.map((input, i) => <Input parent={this} key={'input-circle-' + input.name} index={i} inputName={input.name} inputType={input.type} />)}
          </div>
          {this.props.outputType ? <Output parent={this} outputType={this.props.outputType} /> : ''}
          <ReactResizeDetector handleWidth handleHeight onResize={this.onResize.bind(this)} />
        </div>
      </Draggable>
    )
  }
}
