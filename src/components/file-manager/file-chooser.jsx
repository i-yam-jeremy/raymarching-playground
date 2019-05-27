import React from 'react'
import Popup from 'reactjs-popup'
import NodeEditorType from '../node/node-editor-type.js'
import FileManager from './file-manager.js'
import FILE_TYPE_ICONS from './file-type-icons.jsx'
import FileTypePicker from './file-type-picker.jsx'

const STYLES = {
  overlay: {
  },
  content: {
    width: '400px',
    border: '3px solid #002B36',
    backgroundColor: '#001F27',
    borderRadius: '5px',
    padding: '0px'
  }
}

const SELECT_FILE = 0
const NEW_FILE = 1

export default class FileChooser extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      contentType: SELECT_FILE
    }
  }

  openFile(file, closePopup) {
    this.props.app.openFile(file.name, file.type)
    closePopup()
  }

  newFile() {
    this.setState({
      contentType: NEW_FILE
    })
  }

  getContent(contentType, close) {
    switch (contentType) {
      case SELECT_FILE:
        return (
          <div className="file-chooser-container">
            <div className="file-chooser-title">Select a File</div>
            <div className="file-chooser-new-file" onClick={this.newFile.bind(this)}>+</div>
            <div className="file-list-container">
              {FileManager.getFileList().map(file => (
                <div key={file.name} className="file-list-element" onClick={() => this.openFile(file, close)}>
                  <div className="file-list-element-icon">{FILE_TYPE_ICONS[file.type]}</div>
                  <div className="file-list-element-filename">{file.name}</div>
                </div>
              ))}
            </div>
          </div>
        )
      case NEW_FILE:
        return (
          <div className="file-chooser-container">
            <div className="file-chooser-title">New File</div>
            <FileTypePicker />
          </div>
        )
    }

    throw 'Invalid content type: ' + contentType
  }

  render() {
    return (
      <div>
        <Popup
          trigger={this.props.trigger}
          overlayStyle={STYLES.overlay}
          contentStyle={STYLES.content}
          modal
          closeOnDocumentClick
          onClose={() => this.setState({contentType: SELECT_FILE})} >
          {close => this.getContent(this.state.contentType, close)}
        </Popup>
      </div>
    )
  }

}
