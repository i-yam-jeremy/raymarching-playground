import React from 'react'

class SDFOutput extends React.Component {

  compile(methodName) {
    return `
      float ${methodName}() {
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

SDFOutput.inputs = [{type: 'float', name: 'distance'}]

SDFOutput.outputType = null

SDFOutput.title = 'SDF Output'

export default SDFOutput
