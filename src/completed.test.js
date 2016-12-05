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
