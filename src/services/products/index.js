const express = require("express") 
const fs = require("fs")
const path = require("path")
const uniqid = require("uniqid")
const {getProducts, writeProducts} = require("../../lib/fsUtilities")

//VALIDATION
const {check, validationResult} = require("express-validator")

const router = express.Router()


const readFile = fileName => {
    const fileAsBuffer = fs.readFileSync(path.join(__dirname, fileName)); //12
    const fileAsString = fileAsBuffer.toString()
    return JSON.parse(fileAsString)
}

//GET:id
router.get("/:id", async (req, res, next) => {
    try {
        const products = await readFile("products.json")
        const selectedProduct = products.filter(
            product => product._id === req.params.id)
        if (products.length > 0) {

            res.send(selectedProduct)
        } else {
            const err = new Error()
            err.httpStatusCode = 404
            next (err)
        }
    } catch (error) {
        next (error)
    }
})


//GET
router.get("/", async (req, res, next) => {
    try {
        const products = await readFile("products.json")
        console.log(req.query) 
        console.log(req.query.name)
        if (req.query && req.query.name) {
            const filteredProducts = products.filter(
                product => product.hasOwnProperty("name")
                    && product.name.toLowerCase() === req.query.name.toLowerCase())
            res.send(filteredProducts)
        }
        else {
            res.send(products)
        }
    } catch (error) {
        next (error)
    }
})


//POST
router.post("/",
    [check("name").exists().withMessage("Name is a mandatory field"),
        check("description").exists().withMessage("Description is a mandatory field"),
        check("brand").exists().withMessage("Brand is a mandatory field"),
        check("imageURL").exists().withMessage("imageURL is a mandatory field"),
        check("price").exists().withMessage("Price is a mandatory field")
            .isInt().withMessage("Price must be an integer!"),
        check("category").exists().withMessage("Category is a mandatory field"),

    ], async (req, res, next) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty())
        {
            const err = new Error()
            err.message = errors
            err.httpStatusCode = 400
            next(err)

        }
        else {const products = await readFile("products.json")
        const newProduct = {
            ...req.body,
            _id: uniqid(),
            modifiedAt: new Date(),
        }
            console.log(newProduct._id)
        console.log(newProduct)

        products.push(newProduct)
        await fs.writeFileSync(path.join(__dirname, "products.json"), JSON.stringify(products))
        res.status(201).send({ id: newProduct._id })
        }
    }
    catch (error) {
        next(error)
    }
})
router.post("/:_id/add", [
    check("name")
    .isLength({min: 4})
    .withMessage("Name must be at least 4 characters.")
    .exists()
    .withMessage("Name is a required field."),
    check("description")
    .isLength({min: 20} || {max: 140})
    .withMessage("Description must be between 20 and 140 characters")
    .exists()
    .withMessage("This field is required"),
    check("repoURL")
    .isURL()
    .withMessage("This is not a valid URL")
    .exists()
    .withMessage("This field is required"), 
    
], (req, res, next) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            //const err = new ApiError(errors,400,"warning")
           // console.log(err)
        } else {
            const projectDB = readFile("products.json")
            const newProj = {
                ...req.body,
                _id: uniqid(),
                productID: req.params.id,
                createdAt: new Date(),
                modifiedAt: new Date()
              }; 

              projectDB.push(newProj)
              fs.writeFileSync(
                  path.join(__dirname, "../reviews/reviews.json"),
                  JSON.stringify(projectDB)
              )

              res.status(201).send({newProj})
        } 
        } catch (error) {
            const err = new ApiError(error,500,"error")
            next(err)
        }
    }
)
//DELETE
router.delete("/:id", async (req, res, next) => {
    try {
        const products = await readFile("products.json")
        const newProducts = products.filter(product => product._id !== req.params.id)
        await fs.writeFileSync(path.join(__dirname, "products.json"), JSON.stringify(newProducts))
        res.status(204).send()
    }
    catch (error) {
        next(error)
    }
})


//PUT
router.put("/:id", async (req, res, next) => {
    try {
        const products = await readFile("products.json")
        const newProducts = products.filter(product => product._id !== req.params.id)

        const modifiedProduct = {
            ...req.body,
            _id: req.params.id,
            modifiedAt: new Date(),
        }

        newProducts.push(modifiedProduct)
        await fs.writeFileSync(path.join(__dirname, "products.json"), JSON.stringify(newProducts))
        res.send({ modifiedProduct })
    }
    catch (error) {
        next(error)
    }
})
    

    //POST 
   // router.post("/ carts / { cartId } / add - to - cart / { productId }




module.exports = router