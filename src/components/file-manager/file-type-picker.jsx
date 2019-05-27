import React from 'react'
import NodeEditorType from '../node/node-editor-type.js'
import FILE_TYPE_ICONS from './file-type-icons.jsx'

export default class FileTypePicker extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedType: NodeEditorType.SDF
    }
  }

  getFileTypeIcon(editorType) {
    return FILE_TYPE_ICONS[editorType]
  }

  getSelectedType() {
    return this.state.selectedType
  }

  render() {
    return (
      <div className="file-type-picker-container">
        <div>
          {this.getFileTypeIcon()}
        </div>
      </div>
    )
  }

}
