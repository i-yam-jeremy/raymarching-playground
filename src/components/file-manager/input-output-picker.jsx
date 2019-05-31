import React from 'react'
import classNames from 'classnames'
import DataTypePicker from './data-type-picker.jsx'


export default class InputOutputPicker extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      inputs: []
    }

    this.currentInputId = 0
    this.outputType = null
  }

  componentDidMount() {
    this.callOnChangeCallback()
  }

  addInput() {
    let newInput = {
      name: '',
      type: null,
      id: this.currentInputId++
    }
    this.setState({
      inputs: this.state.inputs.concat([newInput])
    }, this.callOnChangeCallback.bind(this))
  }

  deleteInput(id) {
    this.setState({
      inputs: this.state.inputs.filter(input => input.id != id)
    }, this.callOnChangeCallback.bind(this))
  }

  setInputType(id, newType) {
    this.setState({
      inputs: this.state.inputs.map(input => ({
        ...input,
        type: (input.id == id) ? newType : input.type
      }))
    }, this.callOnChangeCallback.bind(this))
  }

  getInputById(id) {
    for (let input of this.state.inputs) {
      if (input.id == id) {
        return input
      }
    }
    return null
  }

  isValidInput(id) {
    let foundInput = this.getInputById(id)
    if (foundInput) {
      if (foundInput.name == '') {
        return false
      }
      for (let input of this.state.inputs) {
        if (input.id != foundInput.id && input.name == foundInput.name) {
          return false
        }
      }
      return true
    }
    throw 'Input with id ' + id + ' not found in ' + JSON.stringify(this.state.inputs)
  }

  onNameChange(id, newName) {
    this.setState({
      inputs: this.state.inputs.map(input => ({
        ...input,
        name: (input.id == id) ? newName : input.name
      }))
    }, this.callOnChangeCallback.bind(this))
  }

  setOutputType(type) {
    this.outputType = type
    this.callOnChangeCallback()
  }

  allInputsValid() {
    return this.state.inputs
            .map(input => this.isValidInput(input.id))
            .reduce((a,b) => a && b, true)
  }

  getData() {
    let inputsWithoutIdField = this.state.inputs.map(input => {
      let newObj = Object.assign({}, input)
      delete newObj.id
      return newObj
    })
    return {
      inputs: inputsWithoutIdField,
      outputType: this.outputType,
      valid: this.allInputsValid(),
      component: this
    }
  }

  shake() {
    let t = 0.0
    let amplitude = 10
    let frequency = 5
    let step = 0.02
    let duration = 0.5

    let that = this
    function update() {
      let decay = 1/(1+20*t)
      let x = decay*amplitude*Math.sin(frequency*t*2*Math.PI)
      for (let input of that.state.inputs) {
        if (!that.isValidInput(input.id)) {
          that.refs['input-' + input.id].style.transform = `translateX(${x}px)`
        }
      }

      t += step

      if (t < duration) {
        window.requestAnimationFrame(update)
      }
    }

    update()
  }

  callOnChangeCallback() {
    if (typeof this.props.onChange == 'function') {
      this.props.onChange(this.getData())
    }
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
              <div key={'input-' + input.id} className="input">
                <div className="delete" onClick={() => this.deleteInput(input.id)}>×</div>
                <div className="data-type">
                  <DataTypePicker onChange={type => this.setInputType(input.id, type)} />
                </div>
                <input ref={'input-' + input.id} className={classNames('name', {'name-invalid': !this.isValidInput(input.id)})}
                       type="text" value={input.name}
                       onChange={(e) => this.onNameChange(input.id, e.target.value)} />
              </div>
            ))}
          </div>
        </div>
        <div className="output-type">
          <div className="label">
            Output
          </div>
          <div className="data-type-picker">
            <DataTypePicker onChange={this.setOutputType.bind(this)} />
          </div>
        </div>
      </div>
    )
  }

}
