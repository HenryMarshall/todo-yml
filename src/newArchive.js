const yaml = require("./utility/yaml")
const merge = require("./merge")
const completed = require("./completed")

const newArchive = (archivedYaml, activeYaml) => (
  yaml.safeDump(
    merge(
      yaml.safeLoad(archivedYaml),
      completed(activeYaml)
    )
  )
)

module.exports = newArchive
