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
  // FIXME: I feel a bit dirty using an error for control flow. It would also
  // be nice if the error was handled more nicely on printing in the final catch
  if (!archivedCount(active)) {
    throw new Error("There are no completed todos to archive!")
  }

  const newArchivedYaml = newArchive(archived, active)
  fsp.writeFile(archivePath, newArchivedYaml, "utf-8")

  return active

}).then(active => {
  const newActiveYaml = newActive(active)
  fsp.writeFile(activePath, newActiveYaml, "utf-8")
    .then(() => {
      const activeName = path.basename(activePath)
      const archiveName = path.basename(archivePath)
      const count = archivedCount(active)
      const inflectedTodo = count === 1 ? "Todo" : "Todos"

      console.log(
        `${count} completed ${inflectedTodo} from ${activeName} written to ${archiveName}`
      )
    })

}).catch(err => {
  console.error(err)
})

const archivedCount = R.pipe(
  R.match(/^\s*#\s.*[^:]$/mg),
  R.length
)

