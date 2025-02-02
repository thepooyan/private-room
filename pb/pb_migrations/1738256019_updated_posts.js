/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("3nbhna8s1ubgjxw")

  // update collection data
  unmarshal({
    "listRule": ""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("3nbhna8s1ubgjxw")

  // update collection data
  unmarshal({
    "listRule": null
  }, collection)

  return app.save(collection)
})
