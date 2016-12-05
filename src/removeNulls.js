const R = require("ramda")

// R.pipe(
//   yaml.safeLoad,
//   R.filter(R.pipe(R.isNil, R.not)),
//   R.map(removeNulls)
// )

// const removeNulls = (item) => {
//   if (isFunctor(item)) {
//     return R.pipe(
//       shallowRemoveNulls
//     )
//     item = shallowRemoveNulls(item)
//     return item.map(removeNulls)
//   }
//   else {
//     return item
//   }
// }


// function removeNulls(input) {
//   const containsCompleted = R.test(regex.completed)
//   if (containsCompleted(input)) {
//     throw new TypeError("Must not contain completed todos (yaml commments)")
//   }

//   const todos = yaml.safeLoad(input)
//   return input
// }


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
