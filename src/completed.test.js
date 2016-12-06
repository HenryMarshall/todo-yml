const test = require("ava")
const completed = require("./completed")

test("should return the completed elements in the correct order", t => {
  const input =   `# milk\n- bananas\n# apples\n`
  const expected = ["milk", "apples"]
  t.deepEqual(completed(input), expected)
})

test("should remove keys with null values", t => {
  const input =
`groceryStore:
  - milk
hardwareStore:
  # nails\n`

  const expected = { hardwareStore: ["nails"] }
  t.deepEqual(completed(input), expected)
})

test("should return an empty object if nothing is completed", t => {
  t.deepEqual(completed(""), {})
  t.deepEqual(completed("- milk"), {})
  t.deepEqual(completed("groceryStore:\n  - milk"), {})
})
