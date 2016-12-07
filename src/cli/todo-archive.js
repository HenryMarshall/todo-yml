#!/usr/bin/env node
"use strict";

const program = require("commander")
const fsp = require("fs-promise")
const path = require("path")
const yaml = require("js-yaml")
const EOL = require("os").EOL

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
  const completedTodos = yaml.safeLoad(onlyCompleted(todo))
  const archivedTodos = done ? yaml.safeLoad(done) : {}

  console.log("completedTodos: ", completedTodos)
  console.log("archivedTodos: ", archivedTodos)
  // console.log("done: ", done)
  // const json = files.map(yaml.safeLoad)
  // console.log("json: ", json)
}).catch(err => {
  console.error(`Could not read ${todoPath}`)
  throw err
})
