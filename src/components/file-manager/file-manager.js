import NodeEditorType from '../node/node-editor-type.js'

if (!localStorage.savedFiles) {
  let savedFiles = {}
  savedFiles['main.sdf'] = {nodes: [], inputs: [], outputType: 'float'}
  savedFiles['main.shader'] = {nodes: [], inputs: [], outputType: 'vec3'}
  localStorage.savedFiles = JSON.stringify(savedFiles)
}

function loadFileState(filename) {
  let files = JSON.parse(localStorage.savedFiles)
  if (!files) {
    throw "Couldn't read files saved in localStorage"
  }
  if (!(filename in files)) {
    throw "File not found: " + filename
  }

  return files[filename]
}

function saveFileState(filename, state) {
  let files = JSON.parse(localStorage.savedFiles)
  files[filename] = state
  localStorage.savedFiles = JSON.stringify(files)
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
  let files = JSON.parse(localStorage.savedFiles)
  return Object.keys(files).map(filename => ({
    name: filename,
    type: getFileTypeFromFilename(filename)
  }))
}

function fileExists(filename) {
  let files = JSON.parse(localStorage.savedFiles)
  return (filename in files)
}

function deleteFile(filename) {
  let files = JSON.parse(localStorage.savedFiles)
  delete files[filename]
  localStorage.savedFiles = JSON.stringify(files)
}

export default {
  loadFileState,
  saveFileState,
  getFileList,
  fileExists,
  deleteFile
}
