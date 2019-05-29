import React from 'react'
import NodeEditorType from '../node/node-editor-type.js'
import FILE_TYPE_ICONS from './file-type-icons.jsx'

export default class FileTypePicker extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedType: NodeEditorType.SDF,
      dropdownOpen: false
    }

    this.mousedOverDropdown = false
  }

  getSelectedType() {
    return this.state.selectedType
  }

  selectedType(type) {
    this.setState({
      selectedType: type
    }, () => {
      this.closeDropdown()
      if (typeof this.props.onChange == 'function') {
        this.props.onChange(type)
      }
    })
  }

  openDropdown() {
    this.setState({
      dropdownOpen: true
    })
  }

  closeDropdown() {
    this.setState({
      dropdownOpen: false
    })
    this.mousedOverDropdown = false
  }

  onMouseLeaveContainer() {
    if (!this.mousedOverDropdown) {
      this.closeDropdown()
    }
  }

  render() {
    return (
      <div className="file-type-picker-container" onMouseLeave={this.onMouseLeaveContainer.bind(this)}>
        <div className="file-type-picker-button" onClick={this.openDropdown.bind(this)}>
          <div className="file-type-picker-icon">
            {FILE_TYPE_ICONS[this.getSelectedType()]}
          </div>
          <div className="file-type-picker-more-arrow">
            <svg width={8} height={6} xmlns="http://www.w3.org/2000/svg">
              <polygon points="0,0 8,0 4,6" fill="#99b2b8" />
            </svg>
          </div>
        </div>
        {this.state.dropdownOpen ?
          <div className="file-type-picker-dropdown" onMouseEnter={() => this.mousedOverDropdown = true} onMouseLeave={this.closeDropdown.bind(this)}>
            {Object.keys(NodeEditorType).map(typeName => (
              <div className="file-type-picker-dropdown-item" key={typeName} onClick={() => this.selectedType(NodeEditorType[typeName])}>
                {FILE_TYPE_ICONS[NodeEditorType[typeName]]}
              </div>
            ))}
          </div>
        : null}
      </div>
    )
  }

}
