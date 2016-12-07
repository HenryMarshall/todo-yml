const R = require("ramda")

function merge(a, b) {
  if (R.isEmpty(a)) {
    return b
  }
  else if (R.isEmpty(b)) {
    return a
  }
  else {
    return R.type(a) === "Array" && R.type(b) === "Array" ?
      R.concat(a, b) :
      R.mergeWith(R.concat, a, b)
  }
}

module.exports = merge
