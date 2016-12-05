const test = require("ava")
const removeNulls = require("./removeNulls")

test("removeNulls should return the input if no props are null", t => {
  const input = { groceryStore: ["milk"], hardwareStore: ["nails"] }
  t.deepEqual(removeNulls(input), input)
})

test("removeNulls should remove shallow nulls", t => {
  const input = { groceryStore: null, hardwareStore: ["nails"] }
  const output = { hardwareStore: ["nails"] }
  t.deepEqual(removeNulls(input), output)
})

test("removeNulls should remove deep nulls", t => {
  const input = { groceryStore: { cake: "sugar", dinner: null } }
  const output = { groceryStore: { cake: "sugar" } }
  t.deepEqual(removeNulls(input), output)
})
