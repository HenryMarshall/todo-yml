const test = require("ava")
const completed = require("./completed")

test("should return only the completed elements", t => {
  const input =   `# milk\n- bananas\n# apples\n`
  const expected = `- milk\n- apples\n`
  t.is(completed(input), expected)
})

test("should remove keys with null values", t => {
  const input =
`groceryStore:
  - milk
hardwareStore:
  # nails\n`

  const expected =
`hardwareStore:
  - nails\n`

  t.is(completed(input), expected)
})

test("should return null if nothing is completed", t => {
  t.is(completed(""), null)
  t.is(completed("- milk"), null)
  t.is(completed("groceryStore:\n  - milk"), null)
})
