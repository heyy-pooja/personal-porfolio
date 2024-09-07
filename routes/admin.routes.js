const router = require("express").Router()
const adminController = require("../controller/admin.controller")

router
    .post("/add-tech", adminController.addTechnology)
    .get("/get-tech", adminController.getTechnology)
    .put("/update-tech/:id", adminController.updateTechnology)
    .delete("/delete-tech/:id", adminController.deleteTechnology)

    .get("/get-social", adminController.getSocial)
    .post("/add-social", adminController.addSocial)
    .put("/update-social/:id", adminController.updateSocial)
    .delete("/delete-social/:id", adminController.deleteSocial)


module.exports = router
