import React from 'react'
import Popup from 'reactjs-popup'
import NodeEditorType from '../node/node-editor-type.js'
import FileManager from './file-manager.js'
import FILE_TYPE_ICONS from './file-type-icons.jsx'
import FileTypePicker from './file-type-picker.jsx'
import NewFilenameInput from './new-filename-input.jsx'
import InputOutputPicker from './input-output-picker.jsx'

const TRASH_FILE_ICON = (
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 640" width="32" height="32"><defs><path d="M220 80L420 80L420 120L220 120L220 80Z" id="h3wwWXwEw"></path><path d="M160 170.48L480 170.48L480 555.58L160 555.58L160 170.48Z" id="e9WLmcLjj"></path><path d="M420.02 209.42L420 519.39L380 519.39L380.02 209.42L420.02 209.42Z" id="ciJFh8MEn"></path><path d="M540 150.3L100 150.3L100 190.3L540 190.3L540 150.3Z" id="ao2jbibKX"></path><path d="M260 109.09L260 181.31L220 181.31L220 109.09L260 109.09Z" id="bzN86h8p5"></path><path d="M420 110.1L420 182.32L380 182.32L380 110.1L420 110.1Z" id="a3HaxrttM"></path><path d="M340.02 209.42L340 519.39L300 519.39L300.02 209.42L340.02 209.42Z" id="c1eSbNZzSI"></path><path d="M260 209.42L259.98 519.39L219.98 519.39L220 209.42L260 209.42Z" id="b8CdUn4N0"></path></defs><g><g><g><use xlinkHref="#h3wwWXwEw" opacity="1" fill="#99b2b8" fillOpacity="1"></use></g><g><use xlinkHref="#e9WLmcLjj" opacity="1" fill="#99b2b8" fillOpacity="0"></use><g><use xlinkHref="#e9WLmcLjj" opacity="1" fillOpacity="0" stroke="#99b2b8" strokeWidth="40" strokeOpacity="1"></use></g></g><g><use xlinkHref="#ciJFh8MEn" opacity="1" fill="#99b2b8" fillOpacity="1"></use></g><g><use xlinkHref="#ao2jbibKX" opacity="1" fill="#99b2b8" fillOpacity="1"></use></g><g><use xlinkHref="#bzN86h8p5" opacity="1" fill="#99b2b8" fillOpacity="1"></use></g><g><use xlinkHref="#a3HaxrttM" opacity="1" fill="#99b2b8" fillOpacity="1"></use></g><g><use xlinkHref="#c1eSbNZzSI" opacity="1" fill="#99b2b8" fillOpacity="1"></use></g><g><use xlinkHref="#b8CdUn4N0" opacity="1" fill="#99b2b8" fillOpacity="1"></use></g></g></g></svg>
)

const SELECT_FILE = 0
const NEW_FILE = 1

export default class FileChooser extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      contentType: SELECT_FILE,
      newFileType: NodeEditorType.SDF
    }

    this.newFileInputOutputData = null
  }

  getPopupStyle(contentType) {
    return {
      overlay: {
      },
      content: {
        width: contentType == SELECT_FILE ? '400px' : '290px',
        border: '3px solid #002B36',
        backgroundColor: '#001F27',
        borderRadius: '5px',
        padding: '0px'
      }
    }
  }

  openFile(file, closePopup) {
    this.props.app.openFile(file.name, file.type)
    closePopup()
  }

  deleteFile(file) {
    FileManager.deleteFile(file.name)
    this.forceUpdate()
  }

  openNewFileDialog() {
    this.setState({
      contentType: NEW_FILE
    })
  }

  createNewFile(filename, filetype, inputs, outputType, closePopup) {
    closePopup()
    FileManager.saveFileState(filename, {
      nodes: [],
      inputs: inputs,
      outputType: outputType
    })
    this.props.app.openFile(filename, filetype)
  }

  tryCreateNewFile(filename, filetype, closePopup) {
    if (this.newFileInputOutputData && this.newFileInputOutputData.valid) {
      let {inputs, outputType} = this.newFileInputOutputData
      this.createNewFile(filename, filetype, inputs, outputType, closePopup)
    }
    else {
      if (this.newFileInputOutputData) {
        this.newFileInputOutputData.component.shake()
      }
    }
  }

  getContent(contentType, close) {
    switch (contentType) {
      case SELECT_FILE:
        return (
          <div className="file-chooser-container">
            <div className="title">Select a File</div>
            <div className="new-file-button" onClick={this.openNewFileDialog.bind(this)}>+</div>
            <div className="file-list-container">
              {FileManager.getFileList().map(file => (
                <div key={file.name} className="element"
                    onClick={() => this.openFile(file, close)}>
                  <div className="icon">{FILE_TYPE_ICONS[file.type]}</div>
                  <div className="filename">{file.name}</div>
                  <div className="type-signature-container">
                    {'('}
                    {file.state.inputs.length == 0 ?
                      <div className="no-inputs-padding"></div>
                    : null}
                    {file.state.inputs.map((input, i) => (
                      <span>
                        {i > 0 ?
                          ', '
                        : null}
                        <div className={'data-type-' + input.type}></div>
                      </span>
                    ))}
                    {') →'}
                    <div className={'data-type-' + file.state.outputType}></div>
                  </div>
                  <div className="trash" onClick={() => this.deleteFile(file)}>{TRASH_FILE_ICON}</div>
                </div>
              ))}
            </div>
          </div>
        )
      case NEW_FILE:
        return (
          <div className="file-chooser-container">
            <div className="title">New File</div>
            <div className="new-file">
              <div className="filename-input-container">
                <NewFilenameInput type={this.state.newFileType}
                  onEnter={filename => this.tryCreateNewFile(filename, this.state.newFileType, close)}
                  onInvalidEnter={() => this.newFileInputOutputData && this.newFileInputOutputData.component.shake()} />
              </div>
              <div className="file-type-container">
                <FileTypePicker type={this.state.newFileType} onChange={newType => this.setState({newFileType: newType})}/>
              </div>
              <InputOutputPicker onChange={data => this.newFileInputOutputData = data} />
            </div>
          </div>
        )
    }

    throw 'Invalid content type: ' + contentType
  }

  render() {
    let style = this.getPopupStyle(this.state.contentType)
    return (
      <div>
        <Popup
          trigger={this.props.trigger}
          overlayStyle={style.overlay}
          contentStyle={style.content}
          modal
          closeOnDocumentClick
          onClose={() => this.setState({contentType: SELECT_FILE})} >
          {close => this.getContent(this.state.contentType, close)}
        </Popup>
      </div>
    )
  }

}
