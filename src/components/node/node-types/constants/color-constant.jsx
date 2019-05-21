import React from 'react'
import NodeEditorType from '../../node-editor-type.js'
import { ChromePicker } from 'react-color'

/*
 Adapted from react-color documentation
 http://casesandberg.github.io/react-color/#create-helpers
*/
class ColorConstant extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      displayColorPicker: false,
      color: {
        r: '241',
        g: '112',
        b: '19',
        a: '1',
      }
    }
  }

  compile(methodName) {
    return `
      vec3 ${methodName}() {
        return vec3(${this.state.color.r/255}, ${this.state.color.g/255}, ${this.state.color.b/255});
      }`
  }

  handleClick() {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  }

  handleClose() {
    this.setState({ displayColorPicker: false })
  }

  handleChange(color) {
    this.setState({ color: color.rgb })
  }

  getSaveState() {
    return {
      color: this.state.color
    }
  }

  loadState(state) {
    this.setState({
      color: state.color
    })
  }

  render() {
    return (
      <div>
        <div className="colorpicker-swatch" onClick={ this.handleClick.bind(this) }>
          <div className="colorpicker-color" style={{background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`}} />
        </div>
        { this.state.displayColorPicker ? <div className="colorpicker-popover">
          <div className="colorpicker-cover" onClick={ this.handleClose.bind(this) }/>
          <ChromePicker color={ this.state.color } onChange={ this.handleChange.bind(this) } />
        </div> : null }
      </div>
    )
  }
}

ColorConstant.inputs = []

ColorConstant.outputType = 'vec3'

ColorConstant.title = 'Color'

ColorConstant.editorTypes = [NodeEditorType.SDF, NodeEditorType.SHADER]

export default ColorConstant