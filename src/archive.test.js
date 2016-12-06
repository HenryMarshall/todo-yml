const test = require("ava")
const archive = require("./archive")

test("archive should have no effect if nothing is completed", t => {
  const activeYaml = `groceryStore:\n  - bananas\n`
  const archivedYaml = `groceryStore:\n  - milk\n`
  const { activeYaml: newActive, archivedYaml: newArchive } =
    archive({ activeYaml, archivedYaml })
  t.is(activeYaml, newActive)
  t.is(archivedYaml, newArchive)
})

test("archive should copy over completed projects leaving nothing", t => {
  const { activeYaml: newActive, archivedYaml: newArchive } =
    archive({
      activeYaml: `groceryStore:\n  # bananas\n`,
      archivedYaml: `hardwareStore:\n  - nails\n`,
    })
  const expectedActive = "\n"
  const expectedArchive =
    `hardwareStore:\n  - nails\ngroceryStore:\n  - bananas\n`

  t.is(newActive, expectedActive)
  t.is(newArchive, expectedArchive)
})

