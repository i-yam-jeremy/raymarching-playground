import React from 'react'

class Time extends React.Component {

  compile(methodName) {
    return `
      float ${methodName}() {
        return u_Time;
      }`
  }

  render() {
    return (
        <div>
        </div>
    )
  }
}

Time.inputs = []

Time.outputType = 'float'

Time.title = 'Time'

export default Time
