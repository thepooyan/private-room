/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3nbhna8s1ubgjxw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rmteeiew",
    "name": "user",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3nbhna8s1ubgjxw")

  // remove
  collection.schema.removeField("rmteeiew")

  return dao.saveCollection(collection)
})
