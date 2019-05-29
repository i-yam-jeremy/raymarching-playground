import React from 'react'

const DATA_TYPES = ['float', 'vec3']

export default class FileTypePicker extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedType: DATA_TYPES[0],
      dropdownOpen: false
    }

    this.mousedOverDropdown = false
  }

  componentDidMount() {
    if (typeof this.props.onChange == 'function') {
      this.props.onChange(this.state.selectedType) // Send default type selected
    }
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
      <div className="data-type-picker-container" onMouseLeave={this.onMouseLeaveContainer.bind(this)}>
        <div className="data-type-picker-button" onClick={this.openDropdown.bind(this)}>
          <div className={'data-type-picker-circle-' + this.state.selectedType}></div>
          <div className="data-type-picker-label">
            {this.state.selectedType}
          </div>
          <div className="data-type-picker-more-arrow">
            <svg width={8} height={6} xmlns="http://www.w3.org/2000/svg">
              <polygon points="0,0 8,0 4,6" fill="#99b2b8" />
            </svg>
          </div>
        </div>
        {this.state.dropdownOpen ?
          <div className="data-type-picker-dropdown" onMouseEnter={() => this.mousedOverDropdown = true} onMouseLeave={this.closeDropdown.bind(this)}>
            {DATA_TYPES.map(typeName => (
              <div className="data-type-picker-dropdown-item" key={typeName} onClick={() => this.selectedType(typeName)}>
                <div className={'data-type-picker-circle-' + typeName}></div>
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
