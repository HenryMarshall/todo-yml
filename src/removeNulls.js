const R = require("ramda")
const yaml = require("js-yaml")
const { regex } = require("./utility")

function removeNulls(input) {
  const containsCompleted = R.test(regex.completed)
  if (containsCompleted(input)) {
    throw new TypeError("Must not contain completed todos (yaml commments)")
  }
  return input
}

module.exports = removeNulls
