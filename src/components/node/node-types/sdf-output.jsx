import React from 'react'

class SDFOutput extends React.Component {

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

SDFOutput.specialCompilation = true

export default SDFOutput
