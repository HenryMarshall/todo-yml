const test = require("ava")
const archive = require("./archive")

test("should have no effect if nothing is completed", t => {
  const activeYaml = `groceryStore:\n  - bananas\n`
  const archivedYaml = `groceryStore:\n  - milk\n`
  const { activeYaml: newActive, archivedYaml: newArchive } =
    archive({ activeYaml, archivedYaml })
  t.is(activeYaml, newActive)
  t.is(archivedYaml, newArchive)
})

test("should move todos from hitherto unseen projects", t => {
  const { activeYaml: newActive, archivedYaml: newArchive } =
    archive({
      activeYaml: `groceryStore:\n  # bananas\n`,
      archivedYaml: `hardwareStore:\n  - nails\n`,
    })
  const expectedActive = "\n"
  const expectedArchive =
    `hardwareStore:\n  - nails\ngroceryStore:\n  - bananas\n`

  t.is(newActive, expectedActive)
  // This order is not yet guarenteed
  t.is(newArchive, expectedArchive)
})

test("should concat completed todos from the same project", t => {
  const { activeYaml: newActive, archivedYaml: newArchive } =
    archive({
      activeYaml: `groceryStore:\n  # bananas\n`,
      archivedYaml: `groceryStore:\n  - milk\n`,
    })
  const expectedActive = "\n"
  const expectedArchive = `groceryStore:\n  - milk\n  - bananas\n`

  t.is(newActive, expectedActive)
  t.is(newArchive, expectedArchive)
})
