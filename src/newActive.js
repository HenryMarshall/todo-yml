const R = require("ramda")
const yaml = require("./utility/yaml")
const removeNulls = require("./removeNulls")

// Expects activeYaml
const newActive = R.pipe(
  yaml.safeLoad,
  removeNulls,
  yaml.safeDump
)

module.exports = newActive
