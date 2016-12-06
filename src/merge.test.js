const test = require("ava")
const merge = require("./merge")

test("should have no effect if nothing is completed", t => {
  const completed = {}
  const archived = { groceryStore: ["bananas"] }
  const newArchived = merge(archived, completed)
  t.deepEqual(newArchived, archived)
})

test("should copy completed if archive is empty", t => {
  const completed = { groceryStore: ["bananas"] }
  const archived = {}
  const newArchived = merge(archived, completed)
  t.deepEqual(newArchived, completed)
})

test("should move todos from hitherto unseen projects", t => {
  const newArchived = merge(
    { groceryStore: ["bananas"] },
    { hardwareStore: ["nails"] }
  )
  const expectedArchived = {
    groceryStore: ["bananas"],
    hardwareStore: ["nails"],
  }
  t.deepEqual(newArchived, expectedArchived)
})

test("should concat completed todos from the same project", t => {
  const newArchived = merge(
    { groceryStore: ["bananas"] },
    { groceryStore: ["apples"] }
  )
  const expectedArchived = { groceryStore: ["bananas", "apples"] }
  t.deepEqual(newArchived, expectedArchived)
})

test("should throw if mixing todos and keys", t => {
  const archivedObj = { groceryStore: { cookies: "sugar" } }
  const completedArr = { groceryStore: ["bananas"] }
  t.throws(merge.bind(null, archivedObj, completedArr), TypeError)

  const archivedArr = { groceryStore: ["sugar"] }
  const completedObj = { groceryStore: { parfait: "bananas" } }
  t.throws(merge.bind(null, archivedArr, completedObj), TypeError)
})
