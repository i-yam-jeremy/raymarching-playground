import React from 'react'
import FileManager from '../file-manager/file-manager.js'
import toast from 'toasted-notes'
import 'toasted-notes/src/styles.css'

let app = null

class ErrorMessage extends React.Component {

  render() {
    return (
      <div className="error-message-container">
        <div className="message">{this.props.message}</div>
        <div className="close" onClick={this.props.onClose}>×</div>
      </div>
    )
  }

}

class ErrorManager {

  static init(appInstance) {
    app = appInstance
  }

  static error(message) {
    toast.notify(({ onClose }) => (
      <ErrorMessage message={message} onClose={onClose} />
    ))
    throw message
  }

  static highlightNode(filename, nodeId) {
    let fileData = FileManager.loadFileState(filename)
    for (let node of fileData.nodes) {
      if (node.id == nodeId) {
        node.errorHighlighted = true
        break
      }
    }
    FileManager.saveFileState(filename, fileData)
    app.rerenderNodeErrorHighlights()
  }

  static clearHighlightedNodes() {
    console.log('cleared highlighting')
    for (let file of FileManager.getFileList()) {
      let fileData = file.state
      for (let node of fileData.nodes) {
        delete node.errorHighlighted
      }
      FileManager.saveFileState(file.name, fileData)
    }
    app.rerenderNodeErrorHighlights()
  }

}


export default ErrorManager
