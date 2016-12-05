const test = require("ava")
const completed = require("./completed")

test("should return only the completed elements", t => {
  const simpleList =   `# milk\n- bananas\n# apples`
  const expectedList = `- milk\n- apples`
  t.is(completed(simpleList), expectedList)
})

