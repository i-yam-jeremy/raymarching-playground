import React from 'react'
import Draggable from 'react-draggable'

class Input extends React.Component {
  getTopOffset() {
    return 25 + 25*this.props.index
  }

  render() {
    return (
      <div>
        <div style={{backgroundColor: '#555555', color: '#FFFFFF', width: '16px', height: '16px', borderRadius: '16px', border: '2px solid #FFA500', position: 'absolute', left: '-10px', top: this.getTopOffset() + 'px', margin: '0px', padding: '0px'}}>
        </div>
        <div style={{position: 'absolute', left: '16px', 'top': this.getTopOffset() + 'px', margin: '0px', padding: '0px'}}>
          {this.props.inputName}
        </div>
      </div>
    )
  }
}

export default class Node extends React.Component {

  render() {
    return (
      <Draggable
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={null}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>
        <div style={{fontFamily: 'Arial, Helvetica, sans-serif', backgroundColor: '#555555', color: '#FFFFFF', width: '100px', height: (this.props.inputs.length*25 + 40) + 'px', borderRadius: '16px', border: '2px solid #777777', position: 'absolute', margin: '0px'}}>
          <div className="handle" style={{textAlign: 'center'}}>{this.props.title}</div>
          <div>
            {this.props.inputs.map((inputName, i) => <Input key={'input-' + inputName} index={i} inputName={inputName} />)}
          </div>
        </div>
      </Draggable>
    )
  }
}
