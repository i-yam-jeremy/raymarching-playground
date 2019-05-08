import React from 'react'
import ReactDOM from 'react-dom'
import LineManager from './line-manager.jsx'

export default class Output extends React.Component {

  constructor(props) {
    super(props)

    this.props.parent.setOutputComponent(this)
  }

  onMouseUp(e) {
    if (LineManager.isLineInProgress()) {
      let input = LineManager.getLineInProgressInput()
      input.onConnectWithOutput(this)
      this.props.parent.onOutputConnectedToInput(input)
      //LineManager.endLine()
    }
  }

  render() {
    return (
        <div onMouseUp={this.onMouseUp.bind(this)} style={{float: 'right', backgroundColor: '#555555', color: '#FFFFFF', width: '16px', height: '16px', borderRadius: '16px', border: '2px solid #FFA500', position: 'absolute', right: '-12px', top: '50%', margin: '0px', padding: '0px'}}>
        </div>
    )
  }
}
