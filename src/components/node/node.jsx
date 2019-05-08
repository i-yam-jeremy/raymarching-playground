import React from 'react'
import ReactDOM from 'react-dom'
import Draggable from 'react-draggable'
import Measure from 'react-measure'
import Input from './input.jsx'
import Output from './output.jsx'

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

  render() {
    return (
      <Draggable
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={null}
        onDrag={this.onDrag.bind(this)}>
        <div style={{float: 'left', display: 'inline-block', fontFamily: 'Arial, Helvetica, sans-serif', backgroundColor: '#555555', color: '#FFFFFF', borderRadius: '16px', border: '2px solid #777777', position: 'absolute', margin: '0px', padding: '10px'}}>
          <div className="handle noselect" style={{textAlign: 'center'}}>{this.props.title}</div>
          <div>
            {this.props.inputs.map((inputName, i) => <Input parent={this} key={'input-' + inputName} index={i} inputName={inputName} />)}
          </div>
          <Output parent={this} />
          <div style={{float: 'left', display: 'inline'}}>
            <textarea rows="4" cols="50"></textarea>
          </div>
        </div>
      </Draggable>
    )
  }
}
