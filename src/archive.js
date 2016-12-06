const R = require("ramda")
const yaml = require("./utility/yaml")
const merge = require("./merge")
const completed = require("./completed")
const removeNulls = require("./removeNulls")

const archive = R.curry((activeYaml, archivedYaml) => ({
  activeYaml: R.pipe(
    yaml.safeLoad,
    removeNulls,
    yaml.safeDump
  )(activeYaml),

  archivedYaml: yaml.safeDump(
    merge(
      yaml.safeLoad(archivedYaml),
      completed(activeYaml)
    )
  ),
}))

module.exports = archive
