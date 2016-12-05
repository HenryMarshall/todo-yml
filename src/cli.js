#!/usr/bin/env node

const program = require("commander")

program
  .version("0.1.0")
  .command(
    "archive <todo.yml> <done.yml>",
    "archive completed todos into done.yml"
  ).alias("a")
  // .command("project", "sort todos by top-level project").alias("p")
  // .command("context", "sort todos by top-level context").alias("c")
  // .command("filter", "filter by todo, project, or context").alias("f")
  // .command("grep", "grep by todo, project, or context").alias("g")
  .parse(process.argv)

console.log("program: ", program)
