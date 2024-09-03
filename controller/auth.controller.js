const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const User = require("../models/User")
const { checkEmpty } = require("../utils/checkEmpty")
const jwt = require("jsonwebtoken")

exports.registerUser = asyncHandler(async (req, res) => {
    const pass = await bcrypt.hash(req.body.password, 10)
    await User.create({ ...req.body, password: hash })
    res.json({ message: "user Register Success" })
})
exports.loginUser = asyncHandler(async (req, res) => {
    // checkEmpty
    const { email, password } = req.body
    const { error, isError } = checkEmpty({ email, password })
    if (isError) {
        return res.status(401).json({ message: "All Fielled Require", error })
    }
    // verify email
    const result = await User.findOne({ email })
    if (!result) {
        return res.status(401).json({ message: "Invalid Email" })
    }
    // verify password
    const verify = await bcrypt.compare(password, result.password)
    if (!verify) {
        return res.status(401).json({ message: "Invalid Password" })
    }
    // create token
    const token = jwt.sign({ userId: result._id }, process.env.JWT_KEY, { expiresIn: "1d" })

    // send cookie
    res.cookie(token, "user", { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 })
    // send response
    res.json({
        message: "user login Success", result: {
            id: result._id,
            email: result.email,
            name: result.name,
        }
    })
})
exports.logOutUser = asyncHandler(async (req, res) => {
    res.clearCookie("user")
    res.json({ message: "user logOut Success" })
})