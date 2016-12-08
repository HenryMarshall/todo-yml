#!/usr/bin/env node

const R = require("ramda")
const program = require("commander")
const fsp = require("fs-promise")
const path = require("path")

const newActive = require("../newActive")
const newArchive = require("../newArchive")

program.parse(process.argv)

const [
  activePath = "./todo.yml",
  archivePath = `${path.dirname(activePath)}/${path.basename(activePath, "todo.yml")}done.yml`,
] = program.args

Promise.all([
  fsp.readFile(activePath, "utf-8"),
  fsp.readFile(archivePath, "utf-8").catch(() =>
    console.log(`${archivePath} was not found. Creating new file`)
  ),

]).then(([active, archived = ""]) => {
  const newArchivedYaml = newArchive(archived, active)
  fsp.writeFile(archivePath, newArchivedYaml, "utf-8")

  return active

}).then(active => {
  // We don't want to overright your active todos until we know that archive
  // succeeded.
  const newActiveYaml = newActive(active)
  fsp.writeFile(activePath, newActiveYaml, "utf-8")
    .then(() => {
      const activeName = path.basename(activePath)
      const archiveName = path.basename(archivePath)
      console.log(`Completed todos in ${activeName} written to ${archiveName}`)
    })

}).catch(err => {
  console.error(err)
})
