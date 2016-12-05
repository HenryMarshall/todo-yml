const R = require("ramda")
const yaml = require("js-yaml")
const { regex } = require("./utility")
const removeNulls = require("./removeNulls")

// This must be done via string manipulation because "completed" todos are
// comments in the todo.yml file and would disappear when converting to JSON.
const removeUncompleted = R.replace(/^\s*-.+[^:]$/mg, "")
const uncommentLeaf = R.replace(regex.completed, "$1- ")

module.exports = R.pipe(
  removeUncompleted,
  uncommentLeaf,
  yaml.safeLoad,
  removeNulls,
  yaml.safeDump
)

