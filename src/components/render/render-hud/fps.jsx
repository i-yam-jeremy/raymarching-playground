import React from 'react'

export default class FPS extends React.Component {

  render() {
    return (
      <div>
        <p>FPS: {Math.round(this.props.fps)}</p>
      </div>
    )
  }

}
