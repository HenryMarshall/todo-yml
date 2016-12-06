const test = require("ava")
const merge = require("./merge")

test("should have no effect if nothing is completed", t => {
  const activeYaml = {}
  const archivedYaml = { groceryStore: ["bananas"] }
  const newArchive = merge(archivedYaml, activeYaml)
  t.deepEqual(archivedYaml, newArchive)
})

test("should move todos from hitherto unseen projects", t => {
  const newArchive = merge(
    { groceryStore: ["bananas"] },
    { hardwareStore: ["nails"] }
  )
  const expectedArchive = {
    groceryStore: ["bananas"],
    hardwareStore: ["nails"],
  }
  t.deepEqual(newArchive, expectedArchive)
})

test("should concat completed todos from the same project", t => {
  const newArchive = merge(
    { groceryStore: ["bananas"] },
    { groceryStore: ["apples"] }
  )
  const expectedArchive = { groceryStore: ["bananas", "apples"] }
  t.deepEqual(newArchive, expectedArchive)
})

