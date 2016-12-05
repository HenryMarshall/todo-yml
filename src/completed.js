const R = require("ramda")
const { regex } = require("./utility")

// This must be done via string manipulation because "completed" todos are
// comments in the todo.yml file and would disappear when converting to JSON.
const removeUncompleted = R.replace(/^\s*-.+[^:]$/mg, "")
const uncommentLeaf = R.replace(regex.completed, "$1- ")
const removeBlankLines = R.replace(/(\r\n|\r|\n){2,}/g, "$1")

module.exports = R.pipe(
  removeUncompleted,
  uncommentLeaf,
  removeBlankLines
)

