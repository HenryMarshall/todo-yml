const R = require("ramda")

const removeUncompleted = R.replace(/^\s*-.+[^:]$/mg, "")
const uncommentLeaf = R.replace(/^(\s*)# (?:- )?/mg, "$1- ")
const removeBlankLines = R.replace(/(\r\n|\r|\n){2,}/g, "$1")

module.exports = R.pipe(
  removeUncompleted,
  uncommentLeaf,
  removeBlankLines,
  R.trim()
)

