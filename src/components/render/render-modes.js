
function createEnumByIndex(...types) {
  let enumObj = {}

  for (let i = 0; i < types.length; i++) {
    enumObj[types[i]] = i
  }

  return enumObj
}

export default createEnumByIndex('STANDARD', 'NORMALS', 'STEPS')
