import React from 'react'

class Input extends React.Component {
  render() {
    return (
      <div>
        <div style={{backgroundColor: '#555555', color: '#FFFFFF', width: '16px', height: '16px', borderRadius: '16px', border: '2px solid #FFA500', position: 'absolute', left: '-10px', top: (25/2 + 25*this.props.index) + 'px', margin: '0px', padding: '0px'}}>
        </div>
        <div style={{position: 'absolute', left: '16px', 'top': (25/2 + 25*this.props.index) + 'px', margin: '0px', padding: '0px'}}>
          {this.props.inputName}
        </div>
      </div>
    )
  }
}

export default class Node extends React.Component {

  render() {
    return (
      <div style={{backgroundColor: '#555555', color: '#FFFFFF', width: '100px', height: (this.props.inputs.length*25 + 25) + 'px', borderRadius: '16px', border: '2px solid black', position: 'absolute', margin: '0px', paddingLeft: '70px'}}>
        <div>
          {this.props.inputs.map((inputName, i) => <Input key={'input-' + inputName} index={i} inputName={inputName} />)}
        </div>
      </div>
    )
  }
}
