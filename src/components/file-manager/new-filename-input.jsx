import React from 'react'
import classNames from 'classnames'
import NodeEditorType from '../node/node-editor-type.js'
import FileManager from './file-manager.js'

// by file type
const FILE_EXTENSIONS = {
  SDF: '.sdf',
  SHADER: '.shader'
}

export default class NewFilenameInput extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      valid: false,
      hasStartedTyping: false
    }
  }

  componentDidMount() {
    this.refs.value.focus()
  }

  componentWillReceiveProps(newProps) {
    this.updateValidity(newProps)
  }

  validFilename(filename, props) {
    return filename.endsWith(FILE_EXTENSIONS[props.type]) &&
           !FileManager.fileExists(filename)
  }

  updateValidity(props) {
    this.setState({
      valid: this.validFilename(this.refs.value.value, props)
    })
  }

  onChange(e) {
    this.setState({
      hasStartedTyping: true
    })
    this.updateValidity(this.props)
  }

  onKeypress(e) {
    if (e.key == 'Enter') {
      this.setState({
        hasStartedTyping: true
      })
      if (this.state.valid) {
        if (typeof this.props.onEnter == 'function') {
          this.props.onEnter(this.refs.value.value)
        }
      }
      else {
        if (typeof this.props.onInvalidEnter == 'function') {
          this.props.onInvalidEnter()
        }
        this.shake()
      }
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
      that.refs.value.style.transform = `translateX(${x}px)`

      t += step

      if (t < duration) {
        window.requestAnimationFrame(update)
      }
    }

    update()
  }

  render() {
    let classes = classNames('new-filename-input', {
      'new-filename-input-invalid': !this.state.valid && this.state.hasStartedTyping
    })
    return (
      <input ref="value" type="text" className={classes}
        onChange={this.onChange.bind(this)}
        onKeyPress={this.onKeypress.bind(this)} />
    )
  }

}
