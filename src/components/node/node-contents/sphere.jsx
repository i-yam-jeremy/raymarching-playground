import React from 'react'

class SphereNodeContent extends React.Component {

  compile(methodName) {
    return `
      float ${methodName}(float radius, vec3 p) {
        return length(p) - radius
      }`
  }

  render() {
    return (
        <div>
        </div>
    )
  }
}

SphereNodeContent.inputs = [
  {type: 'float', name: 'radius'},
  {type: 'vec3', name: 'p'}
]

SphereNodeContent.outputType = 'float'

SphereNodeContent.title = 'Sphere'

export default SphereNodeContent
