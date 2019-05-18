
function createEnum(...types) {
  let enumObj = {}

  for (let type of types) {
    enumObj[type] = type
  }

  return enumObj
}

export default createEnum('SDF', 'SHADER')
