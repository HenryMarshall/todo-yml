const R = require("ramda")

function merge(a, b) {
  if (R.isEmpty(a)) {
    return b
  }
  else if (R.isEmpty(b)) {
    return a
  }
  else {
    const aType = R.type(a)
    const bType = R.type(b)

    if (aType === "Array" && bType === "Array") {
      return R.concat(a, b)
    }
    else if (aType === "Object" && bType === "Object") {
      return R.mergeWith(R.concat, a, b)
    }
    else {
      throw new TypeError("Cannot merge shallow and nested lists together")
    }
  }
}

module.exports = merge
