import React from 'react'

class FloatConstant extends React.Component {

  compile(methodName) {
    return `
      float ${methodName}() {
        return ${this.refs.value.value};
      }`
  }

  render() {
    return (
        <div>
          <input ref="value" type="number" />
        </div>
    )
  }
}

FloatConstant.inputs = []

FloatConstant.outputType = 'float'

FloatConstant.title = 'Float'

export default FloatConstant
