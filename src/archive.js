const R = require("ramda")
const yaml = require("./utility/yaml")
const completed = require("./completed")
const removeNulls = require("./removeNulls")

const archive = R.curry((merge, activeYaml, archivedYaml) => {
  const archivedJson = yaml.safeLoad(archivedYaml)
  const completedJson = completed(activeYaml)
  const uncompletedYaml = R.pipe(
    yaml.safeLoad,
    removeNulls,
    yaml.safeDump
  )(activeYaml)

  const newArchivedJson = merge(archivedJson, completedJson)
  const newArchivedYaml = yaml.safeDump(newArchivedJson)
  return { activeYaml: uncompletedYaml, archivedYaml: newArchivedYaml }
})

module.exports = archive
