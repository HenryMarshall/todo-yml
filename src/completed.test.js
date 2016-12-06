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

test("should return null if nothing is completed", t => {
  t.is(completed(""), null)
  t.is(completed("- milk"), null)
  t.is(completed("groceryStore:\n  - milk"), null)
})
