const test = require("ava")
const completed = require("./completed")

test("should return only the completed elements", t => {
  const input =   `# milk\n- bananas\n# apples`
  const expected = `- milk\n- apples`
  t.is(completed(input), expected)
})

test.skip("should remove keys with null values", t => {
  const input =
`groceryStore:
  - milk
hardwareStore:
  # nails`

  const expected =
`hardwareStore:
  # nails`

  t.is(completed(input), expected)
})
