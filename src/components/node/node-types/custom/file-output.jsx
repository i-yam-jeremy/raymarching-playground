import React from 'react'
import NodeEditorType from '../../node-editor-type.js'
import FloatOutput from './float-output.jsx'
import Vec3Output from './vec3-output.jsx'

function getFileOutputNode(outputType) {
  switch (outputType) {
    case 'float':
      return FloatOutput
    case 'vec3':
      return Vec3Output
    default:
      throw 'Unknown output type: ' + outputType
  }
}

export default getFileOutputNode
