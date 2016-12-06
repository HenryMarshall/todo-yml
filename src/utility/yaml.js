const R = require("ramda")
const yaml = require("js-yaml")

module.exports = {
  // When yaml.safeDump is passed `{}` or `[]` it treats it returns `{}\n` or
  // `[]\n` respectively.
  safeDump(obj, opt) {
    return R.isEmpty(obj) ? "\n" : yaml.safeDump(obj, opt)
  },

  // When yaml.safeLoad is passed "" or "\n" it returns undefined.
  safeLoad(str, opt) {
    return R.isEmpty(str) ? {} : yaml.safeLoad(str, opt)
  },
}
