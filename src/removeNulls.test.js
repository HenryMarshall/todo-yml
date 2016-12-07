const test = require("ava")
const removeNulls = require("./removeNulls")

test("should return the input if no props are null", t => {
  const input = { groceryStore: ["milk"], hardwareStore: ["nails"] }
  t.deepEqual(removeNulls(input), input)
})

test("should remove shallow nulls", t => {
  const input = { groceryStore: null, hardwareStore: ["nails"] }
  const output = { hardwareStore: ["nails"] }
  t.deepEqual(removeNulls(input), output)
})

test("should remove deep nulls", t => {
  const input = { groceryStore: { cake: "sugar", dinner: null } }
  const output = { groceryStore: { cake: "sugar" } }
  t.deepEqual(removeNulls(input), output)
})

test("should do nothing if given an empty object", t => {
  t.deepEqual(removeNulls({}), {})
})

test("should return an array if given an array", t => {
  const input = ["feed cat", null, undefined, "bake cake"]
  const output = ["feed cat", "bake cake"]
  t.true(Array.isArray(removeNulls(input)))
  t.deepEqual(removeNulls(input), output)
})
