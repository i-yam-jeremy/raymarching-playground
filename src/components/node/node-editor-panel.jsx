import React from 'react'
import ReactDOM from 'react-dom'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu"
import Node from './node.jsx'
import NODE_TYPES from './node-types/index.jsx'

export default class NodeEditorPanel extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      nodeData: []
    }

    this.nodeComponents = []
  }

  addNode(node) {
    if (node) {
      this.nodeComponents.push(node)
    }
  }

  contextMenuClick(e, data) {
    const menuBounds = e.target.getBoundingClientRect()
    const nodeEditorPanelBounds = ReactDOM.findDOMNode(this).getBoundingClientRect()
    const x = menuBounds.left - nodeEditorPanelBounds.left
    const y = menuBounds.top - nodeEditorPanelBounds.top
    this.setState({
      nodeData: this.state.nodeData.concat([{
        nodeType: data.nodeType,
        x: x,
        y: y
      }])
    })
  }

  compile() {
    console.log(this.nodeComponents.map((node, i) => node.refs.content.compile('node_' + i)))
  }

  render() {
    this.nodeComponents = []
    return (
      <div>
        <button className="node-editor-compile-button" onClick={this.compile.bind(this)}>Compile</button>
        <ContextMenuTrigger id="node-editor-panel-contextmenu">
          <div className="node-editor-panel">
            {this.state.nodeData.map((nodeData, i) =>
              <Node ref={nodeComponent => this.addNode(nodeComponent)} key={'node-' + i} title={nodeData.nodeType.title} inputs={nodeData.nodeType.inputs} outputType={nodeData.nodeType.outputType} nodeContent={nodeData.nodeType} initialX={nodeData.x} initialY={nodeData.y} />
            )}
          </div>
        </ContextMenuTrigger>

        <ContextMenu id="node-editor-panel-contextmenu">
          <div className="node-editor-contextmenu">
            {NODE_TYPES.map(nodeType =>
              <MenuItem key={'contextmenu-' + nodeType.title} data={{nodeType: nodeType}} onClick={this.contextMenuClick.bind(this)}>
                <div className="node-editor-contextmenu-item">{nodeType.title}</div>
              </MenuItem>
            )}
          </div>
        </ContextMenu>
      </div>
    )
  }
}
