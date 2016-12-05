const test = require("ava")
const removeNulls = require("./removeNulls")

test("removeNulls should return the contents if none have null", t => {
  const input =
`groceryStore:
  - milk
hardwareStore:
  - nails`
  t.is(removeNulls(input), input)
})

test("removeNulls should blow up if yaml includes completed", t => {
  const input =
`groceryStore:
  # milk`
  t.throws(() => removeNulls(input))
})
