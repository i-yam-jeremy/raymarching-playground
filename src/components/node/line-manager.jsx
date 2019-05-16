let lineInProgress = null

export default class LineManager {

  static startLine(input) {
    lineInProgress = input
  }

  static endLine() {
    lineInProgress = null
  }

  static isLineInProgress() {
    return lineInProgress != null
  }

  static getLineInProgressInput() {
    return lineInProgress
  }

}
