import React from 'react'
import ReactDOM from 'react-dom'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu"
import Node from './node.jsx'
import NODE_TYPES from './node-types/index.jsx'

const getNextNodeDataId = (() => {
  let currentId = 0

  function getNextNodeDataId() {
    return currentId++
  }

  return getNextNodeDataId
})()

export default class NodeEditorPanel extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      nodeData: []
    }

    this.nodeComponents = []
  }

  componentDidMount() {
    let thisDomNode = ReactDOM.findDOMNode(this)
    console.log(thisDomNode.scrollWidth, thisDomNode.scrollHeight)
    thisDomNode.scrollTo(thisDomNode.scrollWidth/2, thisDomNode.scrollHeight/2)
    console.log(thisDomNode.scrollTop, thisDomNode.scrollLeft)
  }

  addNode(node, nodeData) {
    if (node) {
      node.nodeData = nodeData
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
        y: y,
        id: getNextNodeDataId()
      }])
    })
  }

  deleteNode(e, data) {
    let index = -1;
    this.state.nodeData.forEach((nodeData, i) => {
      if (nodeData.id == data.nodeId) {
        index = i
      }
    })
    if (index != -1) {
      this.nodeComponents.forEach(node => {
        if (node.nodeData.id == data.nodeId) {
          node.clearConnections()
        }
      })
      this.state.nodeData.splice(index, 1)
      this.setState({
        nodeData: this.state.nodeData
      })
    }
  }

  compile() {
    console.log(this.nodeComponents.map((node, i) => node.refs.content.compile('node_' + i)).join('\n'))
  }

  render() {
    this.nodeComponents = []
    return (
      <div>
        <button className="node-editor-compile-button" onClick={this.compile.bind(this)}>Compile</button>
        <ContextMenuTrigger id="node-editor-panel-contextmenu">
          <div className="node-editor-panel">
            {this.state.nodeData.map(nodeData =>
              <ContextMenuTrigger key={'contextmenu-trigger-node-' + nodeData.id} id={'contextmenu-node-' + nodeData.id}>
                <Node ref={nodeComponent => this.addNode(nodeComponent, nodeData)} key={'node-' + nodeData.id} title={nodeData.nodeType.title} inputs={nodeData.nodeType.inputs} outputType={nodeData.nodeType.outputType} nodeContent={nodeData.nodeType} initialX={nodeData.x} initialY={nodeData.y} />
              </ContextMenuTrigger>
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

        {this.state.nodeData.map(nodeData =>
          <ContextMenu key={'contextmenu-node-delete-' + nodeData.id} id={'contextmenu-node-' + nodeData.id}>
            <div className="node-editor-contextmenu">
              <MenuItem data={{nodeId: nodeData.id}} onClick={this.deleteNode.bind(this)}>
                <div className="node-editor-contextmenu-item">Delete</div>
              </MenuItem>
            </div>
          </ContextMenu>
        )}
      </div>
    )
  }
}
