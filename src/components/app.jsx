import React from 'react'
import Tabs from 'react-draggable-tabs'
import NodeEditorPanel from './node/node-editor-panel.jsx'
import NodeEditorType from './node/node-editor-type.js'
import Render from './render/render.jsx'
import compile from './node/compiler/compiler.js'

import '../stylesheets/main.sass'

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
            <div className="tab-content-container">
              <NodeEditorPanel ref={this.setSDFNodeEditor.bind(this)} editorType={NodeEditorType.SDF} editorId="SDF-1" />
            </div>
          )
        },
        {
          id: 2,
          content: "Shader",
          active: false,
          display: (
            <div className="tab-content-container">
              <NodeEditorPanel ref={this.setShaderNodeEditor.bind(this)} editorType={NodeEditorType.SHADER} editorId="SHADER-1" />
            </div>
          )
        },
        {
          id: 3,
          content: "Render",
          active: false,
          display: (
            <div className="tab-content-container" style={{float: 'right', right: '0px', backgroundColor: 'green'}}>
                <button className="node-editor-compile-button" onClick={this.compile.bind(this)}>Compile</button>
                <Render ref={this.setRenderComponent.bind(this)} />
            </div>
          )
        }
      ]
    }

    this.sdfNodeEditor = null
    this.shaderNodeEditor = null
    this.renderComponent = null
  }

  componentDidMount() {
    this.load()
  }

  setSDFNodeEditor(component) {
    this.sdfNodeEditor = component
  }

  setShaderNodeEditor(component) {
    this.shaderNodeEditor = component
  }

  setRenderComponent(component) {
    this.renderComponent = component
  }

  compile() {
    this.save()
    if (this.sdfNodeEditor && this.shaderNodeEditor && this.renderComponent) {
      let source = compile(this.sdfNodeEditor.getOutputNode(), this.shaderNodeEditor.getOutputNode())
      this.renderComponent.setShaderSource(source)
    }
  }

  save() {
    localStorage.savedState = JSON.stringify(this.getSaveState())
  }

  load() {
    if (localStorage.savedState) {
      this.loadState(JSON.parse(localStorage.savedState))
    }
  }

  getSaveState() {
    return {
    //  tabs: this.state.tabs,
      sdfEditor: this.sdfNodeEditor.getSaveState(),
      shaderEditor: this.shaderNodeEditor.getSaveState()
    }
  }

  loadState(state) {
    this.sdfNodeEditor.loadState(state.sdfEditor)
    this.shaderNodeEditor.loadState(state.shaderEditor)
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
        {this.state.tabs.map(tab =>
          <div key={'tab-content-' + tab.id} style={{display: (tab.active ? 'inline': 'none')}}>
            {tab.display}
          </div>
        )}
      </div>
    )
  }

}
