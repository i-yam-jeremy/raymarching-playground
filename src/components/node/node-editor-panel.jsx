import React from 'react'
import Node from './node.jsx'
import SphereNodeContent from './node-contents/sphere.jsx'

export default class NodeEditorPanel extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      nodes: []
    }
  }

  createNode(nodeContent) {
    return <Node key={'node-' + this.state.nodes.length} title={nodeContent.title} inputs={nodeContent.inputs} outputType={nodeContent.outputType} nodeContent={nodeContent} />
  }

  addNode(nodeContent) {
    const newNode = this.createNode(nodeContent)
    this.setState({
      nodes: this.state.nodes.concat([newNode])
    })
  }

  render() {
    return (
        <div className="node-editor-panel" onClick={(e) => this.addNode(SphereNodeContent)}>
          {this.state.nodes}
        </div>
    )
  }
}
