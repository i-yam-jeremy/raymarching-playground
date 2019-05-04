import React from 'react'

class Input extends React.Component {
  render() {
    return (
      <div style={{width: '16px', height: '16px', 'border-radius': '16px', 'border': '2px solid red', 'position': 'absolute', 'left': '0px', 'top': (20*this.props.index) + 'px'}}>
        {this.props.index}
      </div>
    )
  }
}

export default class Node extends React.Component {

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Hello World</h1>
        <div>
          {this.props.inputs.map((input, i) => <Input key={i} index={i} />)}
        </div>
      </div>
    )
  }
}
