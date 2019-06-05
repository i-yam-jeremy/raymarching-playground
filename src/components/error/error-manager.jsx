import React from 'react'
import toast from 'toasted-notes'
import 'toasted-notes/src/styles.css'

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

  static error(message) {
    toast.notify(({ onClose }) => (
      <ErrorMessage message={message} onClose={onClose} />
    ))
    throw message
  }

}


export default ErrorManager
