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

    this.inputConnections = []
    this.inputComponents = {}
    this.outputComponent = null
    this.previousWidth = 0
    this.previousHeight = 0
    this.nodeContent = null
  }

  onOutputConnectedToInput(input) {
    if (this.inputConnections.indexOf(input) == -1) {
      this.inputConnections.push(input)
    }
  }

  onDrag(e, data) {
    this.props.editor.onContentChanged()
    for (let inputConnection of this.inputConnections) {
      let bounds = ReactDOM.findDOMNode(this.outputComponent).getBoundingClientRect()
      inputConnection.onConnectedOutputMoved(data.deltaX, data.deltaY)
    }

    for (let input of this.props.inputs) {
      this.inputComponents[input.name].updateLineConnectionPosition(data.deltaX, data.deltaY)
    }
  }

  setInputComponent(inputName, node) {
    this.props.editor.onContentChanged()
    this.inputComponents[inputName] = node
  }

  setOutputComponent(outputComponent) {
    this.props.editor.onContentChanged()
    this.outputComponent = outputComponent
  }

  onResize(width, height) {
    if (width != 0 && this.previousWidth != 0) {
      let deltaX = width - this.previousWidth
      let deltaY = height - this.previousHeight

      for (let inputConnection of this.inputConnections) {
        let bounds = ReactDOM.findDOMNode(this.outputComponent).getBoundingClientRect()
        inputConnection.onConnectedOutputMoved(deltaX, deltaY/4) // deltaY/2 because output.topOffset = parentHeight/2 + constant
      }

      this.previousWidth = width
      this.previousHeight = height
    }
  }

  clearConnections() {
    this.props.editor.onContentChanged()
    for (let inputConnection of this.inputConnections) {
      let inputName = inputConnection.props.inputName
      inputConnection.props.parent.inputComponents[inputName].connectedOutput = null
    }
    this.inputConnections = []

    for (let input of this.props.inputs) {
      let inputComponent = this.inputComponents[input.name]
      if (inputComponent.connectedOutput) {
        let inputConns = inputComponent.connectedOutput.props.parent.inputConnections
        inputConns.splice(inputConns.indexOf(inputComponent), 1)
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
        inputs[input] = {
          id: this.inputComponents[input].connectedOutput.props.parent.props.nodeId,
          x: this.inputComponents[input].state.x,
          y: this.inputComponents[input].state.y
        }
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
      inputs: inputs,
      type: this.props.nodeContent.name,
      filename: (this.props.nodeContent.name == 'CustomNode') ? this.props.nodeContent.title : null,
      content: (typeof this.nodeContent.getSaveState == 'function') ? this.nodeContent.getSaveState() : null
    }
  }

  connectInput(inputName, nodeComponent, x, y) {
    this.props.editor.onContentChanged()
    let inputComponent = this.inputComponents[inputName]
    inputComponent.connectedOutput = nodeComponent.outputComponent
    nodeComponent.onOutputConnectedToInput(inputComponent)
    inputComponent.setState({
      x: x,
      y: y
    })
  }

  render() {
    const NodeContent = this.props.nodeContent
    return (
      <Draggable
        handle=".handle"
        defaultPosition={{x: this.props.initialX, y: this.props.initialY}}
        position={null}
        onDrag={this.onDrag.bind(this)}>
        <div className="node">
          <div className="handle">{this.props.title}</div>
          <div className="input-label-container">
            {this.props.inputs.map((input, i) => <p key={'input-label-' + input.name} className="label">{input.name}</p>)}
          </div>
          <div className="content">
            <NodeContent ref={this.setNodeContent.bind(this)} />
          </div>
          <div className="input-circle-container">
            {this.props.inputs.map((input, i) => <Input parent={this} key={'input-circle-' + input.name} index={i} inputName={input.name} inputType={input.type} />)}
          </div>
          {this.props.outputType ? <Output parent={this} outputType={this.props.outputType} /> : ''}
          <ReactResizeDetector handleWidth handleHeight onResize={this.onResize.bind(this)} />
        </div>
      </Draggable>
    )
  }
}
