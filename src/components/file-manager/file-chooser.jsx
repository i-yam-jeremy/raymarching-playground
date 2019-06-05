import React from 'react'
import Popup from 'reactjs-popup'
import NodeEditorType from '../node/node-editor-type.js'
import FileManager from './file-manager.js'
import FILE_TYPE_ICONS from './file-type-icons.jsx'
import FileTypePicker from './file-type-picker.jsx'
import NewFilenameInput from './new-filename-input.jsx'
import InputOutputPicker from './input-output-picker.jsx'

const RENDER_ICON = (<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 640" width="32" height="32"><defs><path d="M544.59 207.85C555.87 207.85 565.02 217 565.02 228.28C565.02 290.48 565.02 456.63 565.02 518.82C565.02 530.11 555.87 539.26 544.59 539.26C450.66 539.26 189.34 539.26 95.41 539.26C84.13 539.26 74.98 530.11 74.98 518.82C74.98 456.63 74.98 290.48 74.98 228.28C74.98 217 84.13 207.85 95.41 207.85C189.34 207.85 450.66 207.85 544.59 207.85Z" id="d6NdzWLiW"></path><path d="M452.41 138.13C461.31 138.13 468.53 145.35 468.53 154.25C468.53 166.99 468.53 189.09 468.53 201.83C468.53 210.73 461.31 217.95 452.41 217.95C396.22 217.95 243.78 217.95 187.59 217.95C178.69 217.95 171.47 210.73 171.47 201.83C171.47 189.09 171.47 166.99 171.47 154.25C171.47 145.35 178.69 138.13 187.59 138.13C243.78 138.13 396.22 138.13 452.41 138.13Z" id="a4Nt9PZ9Dr"></path><clipPath id="cliplk5cZEaA"><use xlinkHref="#a4Nt9PZ9Dr" opacity="1"></use></clipPath><path d="M512.12 264.43C512.12 274.09 504.28 281.93 494.62 281.93C484.96 281.93 477.12 274.09 477.12 264.43C477.12 254.77 484.96 246.93 494.62 246.93C504.28 246.93 512.12 254.77 512.12 264.43Z" id="b1FJ3yddVz"></path><path d="M434.68 378.6C434.68 441.62 383.29 492.78 320 492.78C256.71 492.78 205.32 441.62 205.32 378.6C205.32 315.59 256.71 264.43 320 264.43C383.29 264.43 434.68 315.59 434.68 378.6Z" id="a1JWlZnQRB"></path></defs><g><g><g><use xlinkHref="#d6NdzWLiW" opacity="1" fill="#f364f8" fillOpacity="0"></use><g><use xlinkHref="#d6NdzWLiW" opacity="1" fillOpacity="0" stroke="#99b2b8" strokeWidth="30" strokeOpacity="1"></use></g></g><g><g clipPath="url(#cliplk5cZEaA)"><use xlinkHref="#a4Nt9PZ9Dr" opacity="1" fillOpacity="0" stroke="#99b2b8" strokeWidth="60" strokeOpacity="1"></use></g></g><g><use xlinkHref="#b1FJ3yddVz" opacity="1" fill="#99b2b8" fillOpacity="1"></use></g><g><g><use xlinkHref="#a1JWlZnQRB" opacity="1" fillOpacity="0" stroke="#99b2b8" strokeWidth="30" strokeOpacity="1"></use></g></g></g></g></svg>
)

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

  openRenderTab(closePopup) {
    closePopup()
    this.props.app.openRenderTab()
  }

  openFile(file, closePopup) {
    this.props.app.openFile(file.name, file.type)
    closePopup()
  }

  deleteFile(file) {
    FileManager.deleteFile(file.name)
    this.props.app.closeFileTabIfOpen(file.name)
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
              <div className="element" onClick={() => this.openRenderTab(close)}>
                <div className="icon">{RENDER_ICON}</div>
                <div className="filename">Render</div>
              </div>
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
                      <span key={input.name}>
                        {i > 0 ?
                          ', '
                        : null}
                        <div className={'data-type-' + input.type}></div>
                      </span>
                    ))}
                    {') →'}
                    <div className={'data-type-' + file.state.outputType}></div>
                  </div>
                  {!FileManager.isMainFile(file.name) ?
                    <div className="trash" onClick={() => this.deleteFile(file)}>{TRASH_FILE_ICON}</div>
                  : null}
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
