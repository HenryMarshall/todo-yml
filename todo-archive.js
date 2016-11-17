#!/usr/bin/env node
"use strict";

const program = require("commander")
const fsp = require("fs-promise")
const path = require("path")
const yaml = require("js-yaml")

program
  .option("-k, --keep", "Keep empty projects and/or contexts")
  .parse(process.argv)

const [todoPath, donePath = `${path.dirname(todoPath)}/done.yml`] = program.args
const { keep } = program

Promise.all([
  fsp.readFile(todoPath, "utf-8"),
  fsp.readFile(donePath, "utf-8").catch(err =>
    console.log("error with donePath", err
  )),
]).then(([todo, done]) => {
  todo = onlyCompleted(todo)
  console.log("todo: ", yaml.safeLoad(todo))
  console.log("done: ", done)
  // const json = files.map(yaml.safeLoad)
  // console.log("json: ", json)
}).catch(err => {
  console.error(`Could not read ${todoPath}`)
  throw err
})

function onlyCompleted(yaml) {
  const activeTodo = /^\s+-[^\n]+$\n?/
  const completedSymbol = /#( -)?/
  yaml.replace(activeTodo, "").replace(completedSymbol, "-")
}
