import React from 'react'
import DataTypePicker from './data-type-picker.jsx'


export default class InputOutputPicker extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      inputs: []
    }

    this.currentInputId = 0
  }

  addInput() {
    let newInput = {
      // TODO
      id: this.currentInputId++
    }
    this.setState({
      inputs: this.state.inputs.concat([newInput])
    })
  }

  deleteInput(id) {
    this.setState({
      inputs: this.state.inputs.filter(input => input.id != id)
    })
  }

  render() {
    return (
      <div className="io-picker">
        <div className="inputs-container">
          <div className="label">
            Inputs
          </div>
          <div className="add-input" onClick={this.addInput.bind(this)}>+</div>
          {this.state.inputs.length == 0 ?
            <div className="no-inputs">None</div>
          : null}
          <div className="inputs">
            {this.state.inputs.map(input => (
              <div className="input">
                <div className="delete" onClick={() => this.deleteInput(input.id)}>×</div>
                <div className="data-type">
                  <DataTypePicker />
                </div>
                <input className="name" type="text" />
              </div>
            ))}
          </div>
        </div>
        <div className="output-type">
          <div className="label">
            Output
          </div>
          <div className="io-data-type-picker">
            <DataTypePicker />
          </div>
        </div>
      </div>
    )
  }

}
