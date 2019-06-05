import React from 'react'
import ReactDOM from 'react-dom'
import { ContextMenu, SubMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'
import clickDrag from 'react-clickdrag'
import Node from './node.jsx'
import getNodeTypes from './node-types/index.jsx'
import FileManager from '../file-manager/file-manager.js'

class NodeEditorPanel extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      nodeData: [],
      selecting: false
    }

    this.nodeComponents = []
    this.currentNodeDataId = 0
  }

  componentDidMount() {
    this.props.setEditor(this)
  }

  componentWillReceiveProps(nextProps) { // for clickdrag
    const TAB_HEIGHT = 39
    if (nextProps.dataDrag.isMouseDown) {
      if (!this.state.selecting) {
        this.setState({
          selecting: true,
          selectionX: nextProps.dataDrag.mouseDownPositionX,
          selectionY: nextProps.dataDrag.mouseDownPositionY - TAB_HEIGHT
        })
      }
      this.setState({
        selectionWidth: nextProps.dataDrag.moveDeltaX,
        selectionHeight: nextProps.dataDrag.moveDeltaY
      })
    }
    else {
      this.setState({
        selecting: false
      })
    }
  }

  getNextNodeDataId() {
    return this.currentNodeDataId++
  }

  addNode(node, nodeData) {
    if (node) {
      node.nodeData = nodeData
      this.nodeComponents.push(node)
    }
  }

  onContentChanged() {
    let saveState = this.getSaveState()
    FileManager.saveFileState(this.props.filename, saveState)
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
        id: this.getNextNodeDataId()
      }])
    },this.onContentChanged.bind(this))
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
      }, this.onContentChanged.bind(this))
    }
  }

  getSaveState() {
    return {
      nodes: this.nodeComponents.map(nodeComponent => nodeComponent.getSaveState()),
      inputs: this.props.inputs,
      outputType: this.props.outputType
    }
  }

  loadState(state) {
    let nodeData = state.nodes.map(node => {
      let nodeType
      let nodeTypes = getNodeTypes(this.props.filename, this.props.editorType)
      if (node.type == 'CustomNode') {
        let customNodes = nodeTypes['Custom']
        for (let customNode of customNodes) {
          if (customNode.title == node.filename) {
            nodeType = customNode
            break
          }
        }
        if (!nodeType) {
          throw 'Custom node for ' + node.filename + ' not found'
        }
      }
      else {
        for (let category in nodeTypes) {
          for (let type of nodeTypes[category]) {
            if (type.name == node.type) {
              nodeType = type
            }
          }
        }
      }
      return {
        nodeType: nodeType,
        x: node.x,
        y: node.y,
        id: node.id,
        errorHighlighted: node.errorHighlighted
      }
    })
    let maxNodeId = state.nodes
      .map(node => node.id)
      .reduce((a, b) => Math.max(a, b), 0)
    this.currentNodeDataId = maxNodeId+1
    this.setState({
      nodeData: nodeData
    }, () => {
      let nodeComponentMap = {}
      for (let component of this.nodeComponents) {
        nodeComponentMap[component.props.nodeId] = component
      }

      for (let node of state.nodes) {
        if (node.content) {
          nodeComponentMap[node.id].nodeContent.loadState(node.content)
        }
        for (let input in node.inputs) {
          let inputData = node.inputs[input]
          if (inputData) {
            let otherNodeId = inputData.id
            nodeComponentMap[node.id].connectInput(input, nodeComponentMap[otherNodeId], inputData.x, inputData.y)
          }
        }
      }
    })
  }

  render() {
    this.nodeComponents = []
    return (
      <div>
        <ContextMenuTrigger id={'node-editor-panel-contextmenu-' + this.props.editorId}>
          <div className="node-editor-panel">
            {this.state.nodeData.map(nodeData =>
              <ContextMenuTrigger key={'contextmenu-trigger-node-' + nodeData.id} id={'contextmenu-node-' + this.props.editorId + '-' + nodeData.id}>
                <Node ref={nodeComponent => this.addNode(nodeComponent, nodeData)} key={'node-' + nodeData.id} editor={this} title={nodeData.nodeType.title} inputs={nodeData.nodeType.inputs} outputType={nodeData.nodeType.outputType} nodeContent={nodeData.nodeType} initialX={nodeData.x} initialY={nodeData.y} nodeId={nodeData.id} errorHighlighted={nodeData.errorHighlighted} />
              </ContextMenuTrigger>
            )}
            {this.state.selecting ?
              <div className="selecting-box" style={{left: this.state.selectionX - (this.state.selectionWidth < 0 ? Math.abs(this.state.selectionWidth) : 0), top: this.state.selectionY - (this.state.selectionHeight < 0 ? Math.abs(this.state.selectionHeight) : 0), width: Math.abs(this.state.selectionWidth), height: Math.abs(this.state.selectionHeight)}}></div>
            : null}
          </div>
        </ContextMenuTrigger>

        <ContextMenu id={'node-editor-panel-contextmenu-' + this.props.editorId} ltr>
          <div>
            {Object.keys(getNodeTypes(this.props.filename, this.props.editorType)).map(category =>
              <SubMenu key={'contextmenu-' + category} title={category} ltr>
               {getNodeTypes(this.props.filename, this.props.editorType)[category].map(nodeType =>
                  <MenuItem key={'contextmenu-' + nodeType.title} data={{nodeType: nodeType}} onClick={this.contextMenuClick.bind(this)}>
                    <div>{nodeType.title}</div>
                  </MenuItem>
                )}
              </SubMenu>
            )}
          </div>
        </ContextMenu>

        {this.state.nodeData.map(nodeData =>
          <ContextMenu key={'contextmenu-node-delete-' + nodeData.id} id={'contextmenu-node-' + this.props.editorId + '-' + nodeData.id}>
            <div>
              <MenuItem data={{nodeId: nodeData.id}} onClick={this.deleteNode.bind(this)}>
                <div>Delete</div>
              </MenuItem>
            </div>
          </ContextMenu>
        )}
      </div>
    )
  }
}

export default clickDrag(NodeEditorPanel)
