if (!localStorage.savedFiles) {
  let savedFiles = {}
  savedFiles['main.sdf'] = {nodes: []}
  savedFiles['main.shader'] = {nodes: []}
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

export default {
  loadFileState,
  saveFileState
}
