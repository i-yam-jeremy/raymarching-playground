import React from 'react'
import NodeEditorPanel from './node/node-editor-panel.jsx'

import '../stylesheets/node.sass'

export default class App extends React.Component {

  constructor(props) {
    super(props)

    console.log(SDF_GLSL_BOILERPLATE_SOURCE)

    this.nodeEditor = null
  }

  setNodeEditor(component) {
    this.nodeEditor = component
  }

  compile() {
    if (this.nodeEditor) {
      console.log(this.nodeEditor.compile())
    }
  }

  render() {
    return (
      <div style={{overflow: 'hidden'}}>
        <div className="main-panel-container">
          <NodeEditorPanel ref={this.setNodeEditor.bind(this)} />
        </div>
        <div className="main-panel-container" style={{float: 'right', right: '0px', backgroundColor: 'green'}}>
            <button className="node-editor-compile-button" onClick={this.compile.bind(this)}>Compile</button>
            <textarea style={{width: '90%', height: '90%'}}></textarea>
        </div>
      </div>
    )
  }

}
