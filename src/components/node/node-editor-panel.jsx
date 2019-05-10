import React from 'react'
import ReactDOM from 'react-dom'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu"
import Node from './node.jsx'
import Sphere from './node-types/sphere.jsx'
import FloatConstant from './node-types/float-constant.jsx'

const NODE_TYPES = [
  Sphere,
  FloatConstant
]

export default class NodeEditorPanel extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      nodes: []
    }
  }

  createNode(nodeType, x, y) {
    return <Node key={'node-' + this.state.nodes.length} title={nodeType.title} inputs={nodeType.inputs} outputType={nodeType.outputType} nodeContent={nodeType} initialX={x} initialY={y} />
  }

  addNode(nodeType, x, y) {
    const newNode = this.createNode(nodeType, x, y)
    this.setState({
      nodes: this.state.nodes.concat([newNode])
    })
  }

  contextMenuClick(e, data) {
    const menuBounds = e.target.getBoundingClientRect()
    const nodeEditorPanelBounds = ReactDOM.findDOMNode(this).getBoundingClientRect()
    const x = menuBounds.left - nodeEditorPanelBounds.left
    const y = menuBounds.top - nodeEditorPanelBounds.top
    this.addNode(data.nodeType, x, y)
  }

  render() {
    return (
      <div>
        <ContextMenuTrigger id="node-editor-panel-contextmenu">
          <div className="node-editor-panel">
            {this.state.nodes}
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
