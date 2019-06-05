import toast from 'toasted-notes'
import 'toasted-notes/src/styles.css'


function error(message) {
  toast.notify(message)
  throw message
}


export {
  error
}
