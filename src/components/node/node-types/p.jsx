import React from 'react'

class P extends React.Component {

  compile(methodName) {
    return `
      vec3 ${methodName}(vec3 p) {
        return p;
      }`
  }

  render() {
    return (
        <div>
        </div>
    )
  }

}

P.inputs = []

P.outputType = 'vec3'

P.title = 'P'

P.specialInputs = ['p']

export default P
