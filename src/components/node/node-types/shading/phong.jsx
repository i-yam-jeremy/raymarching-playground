import React from 'react'
import NodeEditorType from '../../node-editor-type.js'

class Phong extends React.Component {

  compile(methodName) {
    return `
      vec3 ${methodName}(vec3 rayDir, vec3 color, float ambientAmount, float diffuseAmount, float specularAmount, vec3 lightDir, vec3 normal) {
        vec3 ambient = clamp(color, 0.0, 1.0);
        vec3 diffuse = clamp(color*dot(lightDir, normal), 0.0, 1.0);
        vec3 v_half = normalize(lightDir - rayDir);
        float specularStrength = pow(clamp(dot(v_half, normal), 0.0, 1.0), specularAmount);

        return ambientAmount*ambient + diffuseAmount*diffuse + specularStrength*vec3(1,1,1);
      }`
  }

  render() {
    return (
        <div>
        </div>
    )
  }
}

Phong.inputs = [
  {type: 'vec3', name: 'color'},
  {type: 'float', name: 'ambientAmount'},
  {type: 'float', name: 'diffuseAmount'},
  {type: 'float', name: 'specularAmount'},
  {type: 'vec3', name: 'lightDir'},
  {type: 'vec3', name: 'normal'}
]

Phong.outputType = 'vec3'

Phong.specialInputs = ['rayDir']

Phong.title = 'Phong'

Phong.editorTypes = [NodeEditorType.SHADER]

export default Phong
