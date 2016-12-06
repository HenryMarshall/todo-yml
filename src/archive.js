const R = require("ramda")
const yaml = require("js-yaml")
const completed = require("./completed")
const removeNulls = require("./removeNulls")

function merge(a, b) {
  if (R.isNil(a)) {
    return b
  }
  else if (R.isNil(b)) {
    return a
  }
  else {
    return Object.assign({}, a, b)
  }
}

function archive({ activeYaml, archivedYaml }) {
  const archivedJson = yaml.safeLoad(archivedYaml)
  const completedJson = completed(activeYaml)
  const uncompletedYaml = R.pipe(
    yaml.safeLoad,
    removeNulls,
    yaml.safeDump,
    // When yaml.safeDump is passed `{}` it treats it as a string literal, and
    // return `{}\n`. It still seems like the nicest yaml library because of
    // its sorting capabilities when performing safeDump.
    R.when(
      R.equals("{}\n"),
      R.always("\n")
    )
  )(activeYaml)

  const newArchivedJson = merge(archivedJson, completedJson)
  const newArchivedYaml = yaml.safeDump(newArchivedJson)
  return { activeYaml: uncompletedYaml, archivedYaml: newArchivedYaml }
}

module.exports = archive
