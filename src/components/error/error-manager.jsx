import toast from 'toasted-notes'
import 'toasted-notes/src/styles.css'

class ErrorManager {

  static error(message) {
    toast.notify(message)
    throw message
  }

}


export default ErrorManager
