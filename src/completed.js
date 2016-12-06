const R = require("ramda")
const yaml = require("js-yaml")
const { regex } = require("./utility")
const removeNulls = require("./removeNulls")

// This must be done via string manipulation because "completed" todos are
// comments in the todo.yml file and would disappear when converting to JSON.
const removeUncompleted = R.replace(/^\s*-.+[^:]$/mg, "")
const uncommentLeaf = R.replace(regex.completed, "$1- ")

// TODO: Implement with folktale
function completed(todos) {
  const completedYaml = R.pipe(removeUncompleted, uncommentLeaf)(todos)
  const isOnlyWhitespace = R.pipe(R.trim, R.empty)
  if (isOnlyWhitespace(completedYaml)) {
    return null
  }
  else {
    const todosJson = R.pipe(yaml.safeLoad, removeNulls)(completedYaml)
    if (R.either(R.isEmpty, R.isNil)(todosJson)) {
      return null
    }
    else {
      return yaml.safeDump(todosJson)
    }
  }
}

// // The happy path...
// R.pipe(
//   removeUncompleted,
//   uncommentLeaf,
//   yaml.safeLoad,
//   removeNulls,
//   yaml.safeDump
// )

module.exports = completed

