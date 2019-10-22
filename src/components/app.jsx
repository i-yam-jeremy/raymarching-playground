import React from 'react'
import Tabs from 'react-draggable-tabs'
import Mousetrap from 'mousetrap'
import NodeEditorPanel from './node/node-editor-panel.jsx'
import NodeEditorType from './node/node-editor-type.js'
import Render from './render/render.jsx'
import {compile} from './node/compiler/compiler.js'
import FileChooser from './file-manager/file-chooser.jsx'
import FileManager from './file-manager/file-manager.js'
import ErrorManager from './error/error-manager.jsx'
import TabContent from './tab-content.jsx'

import '../stylesheets/main.sass'

export default class App extends React.Component {

  constructor(props) {
    super(props)

    ErrorManager.init(this)

    this.state = {
      tabs: []
    }

    this.editors = {} // editors by filename
    this.renderComponent = null
  }

  componentDidMount() {
    Mousetrap.bind(['command+c', 'ctrl+c'], (e) => {
        let activeTab = this.getActiveTab()
        if (activeTab && activeTab.filename) {
          this.editors[activeTab.filename].copySelectionToClipboard()
        }
        return false
    })
    Mousetrap.bind(['command+v', 'ctrl+v'], (e) => {
        let activeTab = this.getActiveTab()
        if (activeTab && activeTab.filename) {
          this.editors[activeTab.filename].pasteFromClipboard()
        }
        return false
    })
  }

  rerenderNodeErrorHighlights() {
    for (let filename in this.editors) {
      let fileData = FileManager.loadFileState(filename)
      this.editors[filename].loadState(fileData)
    }
  }

  setRenderComponent(component) {
    this.renderComponent = component
  }

  compile() {
    try {
      let source = compile()
      this.renderComponent.setShaderSource(source)
    } catch (e) {
      console.error(e)
    }
  }

  openRenderTab() {
    this.addTab({
      id: 0,
      content: "Render",
      active: true,
      display: (
        <TabContent>
          <Render ref={this.setRenderComponent.bind(this)} />
        </TabContent>
      )
    })
  }

  openFile(filename, editorType) {
    let openTab = this.findTabByFilename(filename)

    if (openTab) {
      this.setTabActive(openTab.id)
    }
    else {
      let editorState = FileManager.loadFileState(filename)
      this.addTab({
        content: filename,
        filename: filename,
        active: true,
        display: (
          <div>
          <div className="node-editor-panel-type-signature-container">
            {'('}
            {editorState.inputs.length == 0 ?
              <div className="no-inputs-padding"></div>
            : null}
            {editorState.inputs.map((input, i) => (
              <span key={input.name}>
                {i > 0 ?
                  ', '
                : null}
                <div className={'data-type-' + input.type}></div>
              </span>
            ))}
            {') →'}
            <div className={'data-type-' + editorState.outputType}></div>
          </div>
          <TabContent onScroll={(e) => nodeEditorPanel.onScroll(e)}>
            {(setTabContent) => <NodeEditorPanel tabContentRef={setTabContent} setEditor={(editor) => this.setEditor(filename, editor, editorState)} app={this} filename={filename} editorType={editorType} inputs={editorState.inputs} outputType={editorState.outputType} editorId={filename.replace('.','_')} />}
          </TabContent>
          </div>
        )
      })
    }
  }

  closeFileTabIfOpen(filename) {
    let foundTabIndex = -1
    for (let i = 0; i < this.state.tabs.length; i++) {
      if (this.state.tabs[i].filename == filename) {
        foundTabIndex = i
        break
      }
    }

    if (foundTabIndex != -1) {
      this.state.tabs.splice(foundTabIndex, 1)
      this.setState({
        tabs: this.state.tabs
      })
    }
  }

  setEditor(filename, editor, editorState) {
    if (editor) {
      this.editors[filename] = editor
      editor.loadState(editorState)
    }
  }

  findTabByFilename(filename) {
    for (let tab of this.state.tabs) {
      if (tab.content == filename) {
        return tab
      }
    }
    return null
  }

  getActiveTab() {
    for (let tab of this.state.tabs) {
      if (tab.active) {
        return tab
      }
    }
    return null
  }

  setTabActive(tabId) {
    this.setState({
      tabs: this.state.tabs.map(tab => ({
        ...tab,
        active: tab.id == tabId
      }))
    })
  }

  addTab(tab) {
    let maxTabId = this.state.tabs
                              .map(tab => tab.id)
                              .reduce((a,b) => Math.max(a,b), 0)
    tab.id = maxTabId+1
    this.setState({
      tabs: this.state.tabs.concat([tab])
    }, () => {
      if (tab.active) {
        this.setTabActive(tab.id)
      }
    })
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
    }, () => {
      for (let tab of this.state.tabs) {
        if (tab.id == selectedID) {
          if (tab.content == "Render") {
            this.compile()
          }
        }
      }
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

  render() {
    return (
      <div style={{overflow: 'hidden'}}>
        <Tabs
          moveTab={this.moveTab.bind(this)}
          selectTab={this.selectTab.bind(this)}
          closeTab={this.closedTab.bind(this)}
          tabs={this.state.tabs}
        >
          <FileChooser app={this} trigger={<button>+</button>}/>
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
