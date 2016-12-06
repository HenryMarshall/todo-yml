const R = require("ramda")

function merge(a, b) {
  if (R.isNil(a)) {
    return b
  }
  else if (R.isNil(b)) {
    return a
  }
  else {
    return R.mergeWith(R.concat, a, b)
  }
}

module.exports = merge
