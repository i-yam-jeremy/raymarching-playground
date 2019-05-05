import React from 'react'
import Draggable from 'react-draggable'
import clickDrag from 'react-clickdrag'

class PreClickDragInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      x: 0,
      y: 0
    }
  }

  getTopOffset() {
    return 25 + 25*this.props.index
  }

  getLineRotation() {
    return (180/Math.PI) * Math.atan2(this.state.y, this.state.x);
  }

  getLineLength() {
    return Math.sqrt(this.state.x*this.state.x + this.state.y*this.state.y)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      x: nextProps.dataDrag.isMouseDown ? nextProps.dataDrag.moveDeltaX : 0,
      y: nextProps.dataDrag.isMouseDown ? nextProps.dataDrag.moveDeltaY : 0
    })
  }

  render() {
    return (
        <div className="noselect">
          <div style={{backgroundColor: '#555555', color: '#FFFFFF', width: '16px', height: '16px', borderRadius: '16px', border: '2px solid #FFA500', position: 'absolute', left: '-10px', top: this.getTopOffset() + 'px', margin: '0px', padding: '0px'}}>
          </div>
          <div style={{position: 'absolute', left: '16px', 'top': this.getTopOffset() + 'px', margin: '0px', padding: '0px'}}>
            {this.props.inputName}
          </div>
          <div style={{borderTop: '3px solid rgb(255, 165, 0)', position: 'absolute', left: '0px', top: (this.getTopOffset()+25/2) + 'px', width: this.getLineLength() + 'px', zIndex: -1, transform: 'rotate(' + this.getLineRotation() + 'deg)', transformOrigin: '0px 0px 0px'}}></div>
        </div>
    )
  }
}

const Input = clickDrag(PreClickDragInput);

class Output extends React.Component {

  getLeftOffset() {
    return this.props.parentWidth - 25/2
  }

  getTopOffset() {
    return this.props.parentHeight/2 - 10
  }

  render() {
    return (
        <div className="noselect">
          <div style={{backgroundColor: '#555555', color: '#FFFFFF', width: '16px', height: '16px', borderRadius: '16px', border: '2px solid #FFA500', position: 'absolute', left: this.getLeftOffset() + 'px', top: this.getTopOffset() + 'px', margin: '0px', padding: '0px'}}>
          </div>
        </div>
    )
  }
}

export default class Node extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      width: null,
      height: null
    }
  }

  saveHeight(node) {
    if (node && !this.state.height) {
      this.setState({
        width: node.offsetWidth,
        height: node.offsetHeight
      })
    }
  }

  render() {
    return (
      <Draggable
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={null}>
        <div ref={this.saveHeight.bind(this)} style={{fontFamily: 'Arial, Helvetica, sans-serif', backgroundColor: '#555555', color: '#FFFFFF', width: '100px', height: (this.props.inputs.length*25 + 40) + 'px', borderRadius: '16px', border: '2px solid #777777', position: 'absolute', margin: '0px'}}>
          <div className="handle" style={{textAlign: 'center'}}>{this.props.title}</div>
          <div>
            {this.props.inputs.map((inputName, i) => <Input key={'input-' + inputName} index={i} inputName={inputName} />)}
          </div>
          <Output parentWidth={this.state.width} parentHeight={this.state.height} />
        </div>
      </Draggable>
    )
  }
}
