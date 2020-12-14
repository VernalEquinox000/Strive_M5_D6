const express = require("express")

const router = express.Router()

router.get("/houston", (req, res) => {
    throw new Error ("Housten we've got a problem!")
})

router.get("/nonExistant", (req, res, next) => {
    const err = new ("Not found error")
    err.httpStatusCode = 404
    next(err) // when I use next() inside a route handler
    // I'm passing the control to what's happening next 
    // (error handlers)
})

router.get("/unauthorized", (req, res, next) => {
    const err = new ("Not found error")
    err.httpStatusCode = 400
    next(err) // when I use next() inside a route handler
    // I'm passing the control to what's happening next 
    // (error handlers)
})



module.exports = router