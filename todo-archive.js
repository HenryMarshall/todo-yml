#!/usr/bin/env node
"use strict";

const program = require("commander")
const fsp = require("fs-promise")
const path = require("path")
const yaml = require("js-yaml")

program
  .option("-k, --keep", "Keep empty projects and/or contexts")
  .parse(process.argv)

let [todoPath, donePath = `${path.dirname(todoPath)}/done.yml`] = program.args

Promise.all([
  fsp.readFile(todoPath, "utf-8"),
  fsp.readFile(donePath, "utf-8").catch(err =>
    console.log("error with donePath", err
  )),
]).then(files => {
  const json = files.map(yaml.safeLoad)
  console.log("json: ", json)
}).catch(err => {
  console.error(`Could not read ${todoPath}`)
  throw err
})

// console.log("program.keep: ", program.keep)
// console.log("program.args: ", program.args)

