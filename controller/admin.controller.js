const asyncHandler = require("express-async-handler")
const { checkEmpty } = require("../utils/checkEmpty")
const Technology = require("../models/Technology")
const Social = require("../models/Social")
const upload = require("../utils/upload")
const Carousel = require("../models/Carousel")
const cloudinary = require("../utils/cloudinary.config")
const path = require("path")

// cms
exports.addTechnology = asyncHandler(async (req, res) => {
    const { name, category } = req.body
    const { isError, error } = checkEmpty({ name, category })
    if (isError) {
        return res.status(400).json({ message: "All Feilds Require", error })
    }
    await Technology.create({ name, category })
    res.json({ message: "Technology Create Success" })
})
exports.getTechnology = asyncHandler(async (req, res) => {
    const result = await Technology.find()
    res.json({ message: "Technology get Success", result })
})
exports.updateTechnology = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Technology.findByIdAndUpdate(id, req.body)
    res.json({ message: "Technology update Success" })
})
exports.deleteTechnology = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Technology.findByIdAndDelete(id)
    res.json({ message: "Technology update Success" })
})


// socials
exports.addSocial = asyncHandler(async (req, res) => {
    const { name, links } = req.body
    const { isError, error } = checkEmpty({ name, links })
    if (isError) {
        return res.status(400).json({ message: "All Feilds Require", error })
    }
    await Social.create({ name, links })
    res.json({ message: "social Create Success" })
})
exports.getSocial = asyncHandler(async (req, res) => {
    const result = await Social.find()
    res.json({ message: "socials get Success", result })
})
exports.updateSocial = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Social.findByIdAndUpdate(id, req.body)
    res.json({ message: "social update Success" })
})
exports.deleteSocial = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Social.findByIdAndDelete(id)
    res.json({ message: "Social delete Success" })
})


// carousel
exports.addCarousel = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        const { caption } = req.body
        const { isError, error } = checkEmpty({
            caption: req.body.caption,
        })
        if (isError) {
            return res.status(400).json({ message: "All Feilds Require", error })
        }
        if (!req.file) {
            return res.status(400).json({ message: "Hero Image Is Require", error })
        }
        const { secure_url } = await cloudinary.uploader.upload(req.file.path)
        await Carousel.create({ caption, hero: secure_url })
        res.json({ message: "carousel Create Success" })
    })




})
exports.getCarousel = asyncHandler(async (req, res) => {
    const result = await Carousel.find()
    res.json({ message: "Carousels get Success", result })
})
exports.updateCarousel = asyncHandler(async (req, res) => {
    upload(req, res, async err => {
        if (err) {
            return res.status(400).json({ message: "Multer Error", eror: err.message })
        }

        const { id } = req.params
        if (req.file) {
            const result = await Carousel.findById(id)
            await cloudinary.uploader.destroy(path.basename(result.hero))
            const { secure_url } = await cloudinary.uploader.upload(req.file.path)
            await Carousel.findByIdAndUpdate(id, { caption: req.body.caption, hero: secure_url })
            res.json({ message: "Carousel update Success" })
        } else {
            await Carousel.findByIdAndUpdate(id, { caption: req.body.caption })
            res.json({ message: "Carousel update Success" })
        }
    })
})
exports.deleteCarousel = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await Carousel.findById(id)
    console.log(result)

    await cloudinary.uploader.destroy(path.basename(result.hero))

    await Carousel.findByIdAndDelete(id)
    res.json({ message: "Carousel delete Success" })
})


