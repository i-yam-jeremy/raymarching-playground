import React from 'react'
import NodeEditorPanel from './node/node-editor-panel.jsx'
import Render from './render/render.jsx'
import Tabs from 'react-draggable-tabs'

import '../stylesheets/node.sass'

export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      tabs: [
        {
          id: 1,
          content: "SDF",
          active: true,
          display: (
            <div style={{overflow: 'hidden'}}>
              <div className="main-panel-container">
                <NodeEditorPanel ref={this.setNodeEditor.bind(this)} />
              </div>
            </div>
          )
        },
        {
          id: 2,
          content: "Render",
          active: false,
          display: (
            <div className="main-panel-container" style={{float: 'right', right: '0px', backgroundColor: 'green'}}>
                <button className="node-editor-compile-button" onClick={this.compile.bind(this)}>Compile</button>
                <Render ref={this.setRenderComponent.bind(this)} />
            </div>
          )
        }
      ]
    }

    this.nodeEditor = null
    this.renderComponent = null
  }

  setNodeEditor(component) {
    this.nodeEditor = component
  }

  setRenderComponent(component) {
    this.renderComponent = component
  }

  compile() {
    if (this.nodeEditor && this.renderComponent) {
      let source = this.nodeEditor.compile()
      this.renderComponent.setShaderSource(source)
    }
  }

  // From react-draggable-tabs documentation example
  moveTab(dragIndex, hoverIndex) {
    this.setState((state, props) => {
      let newTabs = [...state.tabs]
      newTabs.splice(hoverIndex, 0, newTabs.splice(dragIndex, 1)[0]);

      return { tabs: newTabs };
    });
  }

  // From react-draggable-tabs documentation example
  selectTab(selectedIndex, selectedID) {
    this.setState((state, props) => {
      const newTabs = state.tabs.map(tab => ({
        ...tab,
        active: tab.id === selectedID
      }));
      return { tabs: newTabs };
    });
  }

  // From react-draggable-tabs documentation example
  closedTab(removedIndex, removedID) {
    this.setState((state, props) => {
      let newTabs = [...state.tabs];
      newTabs.splice(removedIndex, 1);

      if (state.tabs[removedIndex].active && newTabs.length !== 0) {
        // automatically select another tab if needed
        const newActive = removedIndex === 0 ? 0 : removedIndex - 1;
        newTabs[newActive].active = true;
      }

      return { tabs: newTabs };
    });
  }

  addTab() {
    alert("ERROR not implemented")
  }

  render() {
    return (
      <div style={{overflow: 'hidden'}}>
        <Tabs
          moveTab={this.moveTab.bind(this)}
          selectTab={this.selectTab.bind(this)}
          closeTab={this.closedTab.bind(this)}
          tabs={this.state.tabs}
        >
          <button onClick={this.addTab.bind(this)}>+</button>
        </Tabs>
        {this.state.tabs.map(tab => {
          console.log(tab.active ? 'visible' : 'hidden')
          return (<div key={'tab-content-' + tab.id} style={{display: (tab.active ? 'inline': 'none'), height: '100%'}}>
            {tab.display}
          </div>)
        })}
      </div>
    )
  }

}
