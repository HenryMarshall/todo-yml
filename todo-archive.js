#!/usr/bin/env node
"use strict";

const program = require("commander")

program
  .option("-k, --keep", "Keep empty projects and/or contexts")
  .parse(process.argv)

const [todoPath, donePath] = program.args

console.log("program.keep: ", program.keep)
console.log("program.args: ", program.args)

console.log("outside todo: ", todoPath)
console.log("outside done: ", donePath)
