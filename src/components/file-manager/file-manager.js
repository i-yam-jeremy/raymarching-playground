import LocalStorage from 'localstorage'
import NodeEditorType from '../node/node-editor-type.js'

localStorage.clear()
const savedFiles = new LocalStorage('savedFiles')

if (savedFiles.has('main.sdf')[0] != null) {
  savedFiles.put('file-list', [])
  saveFileState('main.sdf', {nodes: [], inputs: [], outputType: 'float'})
  saveFileState('main.shader', {nodes: [], inputs: [], outputType: 'vec3'})
}

function loadFileState(filename) {
  let fileData = savedFiles.get(filename)
  if (fileData[0] != null) {
    throw "File not found: " + filename
  }

  return fileData[1]
}

function saveFileState(filename, state) {
  let files = savedFiles.get('file-list')[1]
  if (files.indexOf(filename) == -1) {
    files.push(filename)
    savedFiles.put('file-list', files)
  }
  savedFiles.put(filename, state)
}

function getFileTypeFromFilename(filename) {
  if (filename.endsWith('.sdf')) {
    return NodeEditorType.SDF
  }
  else if (filename.endsWith('.shader')) {
    return NodeEditorType.SHADER
  }

  throw 'Invalid file type extension: ' + filename
}

function getFileList() {
  let files = savedFiles.get('file-list')[1]
  return files.map(filename => ({
    name: filename,
    type: getFileTypeFromFilename(filename),
    state: loadFileState(filename)
  }))
}

function fileExists(filename) {
  return savedFiles.has(filename)[0] == null
}

function deleteFile(filename) {
  savedFiles.del(filename)
}

export default {
  loadFileState,
  saveFileState,
  getFileTypeFromFilename,
  getFileList,
  fileExists,
  deleteFile
}
