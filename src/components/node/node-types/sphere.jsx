import React from 'react'

class Sphere extends React.Component {

  compile(methodName) {
    return `
      float ${methodName}(float radius, vec3 p) {
        return length(p) - radius;
      }`
  }

  render() {
    return (
        <div>
        </div>
    )
  }
}

Sphere.inputs = [
  {type: 'float', name: 'radius'},
  {type: 'vec3', name: 'p'}
]

Sphere.outputType = 'float'

Sphere.title = 'Sphere'

export default Sphere
