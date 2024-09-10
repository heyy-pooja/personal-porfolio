const router = require("express").Router()
const adminController = require("../controller/admin.controller")

router
    .post("/add-tech", adminController.addTechnology)
    .get("/get-tech", adminController.getTechnology)
    .put("/update-tech/:id", adminController.updateTechnology)
    .delete("/delete-tech/:id", adminController.deleteTechnology)

    // social
    .get("/get-social", adminController.getSocial)
    .post("/add-social", adminController.addSocial)
    .put("/update-social/:id", adminController.updateSocial)
    .delete("/delete-social/:id", adminController.deleteSocial)

    // carousel
    .get("/get-carousel", adminController.getCarousel)
    .post("/add-carousel", adminController.addCarousel)
    .put("/update-carousel/:id", adminController.updateCarousel)
    .delete("/delete-carousel/:id", adminController.deleteCarousel)


module.exports = router
