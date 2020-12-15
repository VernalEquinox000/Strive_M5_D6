const express = require("express")
const cors = require("cors")
const {join} = require ("path")
const listEndPoints =require("express-list-endpoints")
const productsRoutes = require("./services/products")
//const reviewsRoutes = require("./services/reviews")
const errorRoutes = require("./services/problematicRoutes")
const filesRoutes = require("./services/files")
const {notFoundErrorHandler,
    unauthorizedErrorHandler,
    forbiddenErrorHandler,
    badRequestErrorHandler,
    catchAllErrorHandler, } = require("./errorHandling") 

const server = express() 

const port = process.env.PORT || 3001

///MIDDLEWARE
/* const loggerMiddleware = (req, res, next) => {
    console.log(`${req.method} ${req.url} ${new Date()}`)
    next()} 

const errorMiddleware = (err, req, res, next) => { } */

server.use(cors())
server.use(express.json()) 
//server.use(loggerMiddleware)
//NEW server.use(express.static(publicFolderPath))



// ROUTES
//server.use("/reviews", reviewsRoutes)
server.use("/products", productsRoutes)
server.use("/problems", errorRoutes)
server.use("/files", filesRoutes)

// ERROR HANDLERS
server.use(badRequestErrorHandler)
server.use(notFoundErrorHandler)
server.use(forbiddenErrorHandler)
server.use(unauthorizedErrorHandler)
server.use(catchAllErrorHandler)


console.log(listEndPoints(server)) 

server.listen(port, () => { 
    console.log("Server is running on port: ", port)
})
