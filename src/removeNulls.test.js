const test = require("ava")
const removeNulls = require("./removeNulls")

test("removeNulls should return the input if no props are null", t => {
  const input = { groceryStore: ["milk"], hardwareStore: ["nails"] }
  const output = removeNulls(input)
  t.deepEqual(removeNulls(input), input)
})

test("removeNulls should remove nulls", t => {
  const input = { groceryStore: null, hardwareStore: ["nails"] }
  const output = { hardwareStore: ["nails"] }
  t.deepEqual(removeNulls(input), output)
})
