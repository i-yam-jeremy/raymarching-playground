import React from 'react'
import ReactDOM from 'react-dom'
import Draggable from 'react-draggable'
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

    this.inputComponents = []
  }

  saveDimensions(node) {
    if (node && !this.state.height) {
      this.setState({
        width: node.offsetWidth,
        height: node.offsetHeight
      })
    }
  }

  onOutputConnectedToInput(input) {
    this.setState({
      inputConnection: input
    })
  }

  onDrag(e, data) {
    if (this.state.inputConnection) {
      let bounds = ReactDOM.findDOMNode(this.refs.output).getBoundingClientRect()
      this.state.inputConnection.onConnectedOutputMoved(bounds.left, bounds.top)
    }

      //this.refs['input-' + inputName].updateLineConnectionPosition()
  }

  // TODO pass parent prop into Input then get input call this.props.parent.setInput(inputName, this) in Input so it will set the input node so it can be accessed from Node

  render() {
    return (
      <Draggable
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={null}
        onDrag={this.onDrag.bind(this)}>
        <div ref={this.saveDimensions.bind(this)} style={{fontFamily: 'Arial, Helvetica, sans-serif', backgroundColor: '#555555', color: '#FFFFFF', width: '100px', height: (this.props.inputs.length*25 + 40) + 'px', borderRadius: '16px', border: '2px solid #777777', position: 'absolute', margin: '0px'}}>
          <div className="handle" style={{textAlign: 'center'}}>{this.props.title}</div>
          <div>
            {this.props.inputs.map((inputName, i) => <Input key={'input-' + inputName} index={i} inputName={inputName} />)}
          </div>
          <Output ref="output" parent={this} parentWidth={this.state.width} parentHeight={this.state.height} />
        </div>
      </Draggable>
    )
  }
}
