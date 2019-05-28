import React from 'react'

const DATA_TYPES = ['float', 'vec3']
const DATA_TYPE_COLORS = {
  'float': '#489E4F',
  'vec3': '#BCB63E'
}

export default class FileTypePicker extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedType: DATA_TYPES[0],
      dropdownOpen: false
    }
  }

  getSelectedType() {
    return this.state.selectedType
  }

  selectedType(type) {
    this.setState({
      selectedType: type,
      dropdownOpen: false
    }, () => {
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
  }

  render() {
    return (
      <div className="file-type-picker-container">
        <div className="file-type-picker-button" onClick={this.openDropdown.bind(this)}>
          <div className="file-type-picker-icon">
            <div style={{width: '16px', height: '16px', borderRadius: '16px', borderWidth: '2px', borderStyle: 'solid', borderColor: DATA_TYPE_COLORS[this.state.selectedType]}}></div>
            <div className="data-type-picker-label">
              {this.state.selectedType}
            </div>
          </div>
          <div className="file-type-picker-more-arrow">
            <svg width={8} height={6} xmlns="http://www.w3.org/2000/svg">
              <polygon points="0,0 8,0 4,6" fill="#99b2b8" />
            </svg>
          </div>
        </div>
        {this.state.dropdownOpen ?
          <div className="file-type-picker-dropdown" onMouseLeave={this.closeDropdown.bind(this)}>
            {DATA_TYPES.map(typeName => (
              <div className="file-type-picker-dropdown-item" key={typeName} onClick={() => this.selectedType(typeName)}>
                <div style={{width: '16px', height: '16px', borderRadius: '16px', borderWidth: '2px', borderStyle: 'solid', borderColor: DATA_TYPE_COLORS[typeName]}}></div>
                <div className="data-type-picker-label">
                  {typeName}
                </div>
              </div>
            ))}
          </div>
        : null}
      </div>
    )
  }

}
