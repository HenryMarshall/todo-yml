const R = require("ramda")
const yaml = require("./utility/yaml")
const removeNulls = require("./removeNulls")

// This must be done via string manipulation because "completed" todos are
// comments in the todo.yml file and would disappear when converting to JSON.
const removeUncompleted = R.replace(/^\s*-.+[^:]$/mg, "")
const uncommentLeaf = R.replace(/^(\s*)# (?:- )?/mg, "$1- ")

const completed = R.pipe(
  removeUncompleted,
  uncommentLeaf,
  yaml.safeLoad,
  removeNulls
)

module.exports = completed

