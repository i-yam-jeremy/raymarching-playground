import React from 'react'

class P extends React.Component {

  // FIXME find out how to give it access to p (or just add special compilation code to not compile this node and just replace uses with p (maybe make a SpecialNode class that these all come from that just replaces it with a variable))
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

P.inputs = []

P.outputType = 'vec3'

P.title = 'P'

export default P
