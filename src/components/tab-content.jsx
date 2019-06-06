import React from 'react'

export default class TabContent extends React.Component {

  componentDidMount() {
    if (this.content) {
      this.mainDiv.addEventListener('scroll', this.content.onScroll.bind(this.content) || (() => {}))
    }
  }

  setTabContent(content) {
    this.content = content
  }

  render() {
    return (
      <div className="tab-content-container" ref={div => this.mainDiv = div}>
        {typeof this.props.children == 'function' ?
          this.props.children(this.setTabContent.bind(this))
        : this.props.children}
      </div>
    )
  }

}
