const R = require("ramda")

const isFunctor = R.either(R.is(Array), R.is(Object))
const shallowRemoveNulls = R.filter(R.pipe(R.isNil, R.not))

function removeNulls(obj) {
  return R.ifElse(
    isFunctor,
    R.pipe(
      shallowRemoveNulls,
      R.map(removeNulls)
    ),
    R.identity
  )(obj)
}

module.exports = removeNulls
