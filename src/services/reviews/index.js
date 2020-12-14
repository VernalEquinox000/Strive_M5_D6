const express = require("express");
const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid"); //importing of modules and libraries
const { check, validationResult } = require("express-validator");
const router = express.Router(); //initializes routing
const ApiError  = require("../classes/ApiError")
const readFile = fileName => {
    const buffer = fs.readFileSync(path.join(__dirname, fileName))
    const fileContent = buffer.toString()
    return JSON.parse(fileContent)
  }
//now we have to start declaring all the verbs: the first is GET

router.get("/", (req, res) => {
    //the first parameter is the path, then we declare an arrow function
    const productFilePath = path.join(__dirname, "./review.json"); //declaring where the file to be written is
    const fileAsABuffer = fs.readFileSync(productFilePath); //uses fs library to retrieve the content of the file in machine language
    const fileAsAString = fileAsABuffer.toString(); //converts the buffer to a string
    const reviewArr = JSON.parse(fileAsAString); //converts the string into json
    res.send(reviewArr); //sends the response
   
});
router.get("/:_id", (req, res) => {
    //the first parameter is the path, then we declare an arrow function
    const productFilePath = path.join(__dirname, "./review.json"); //declaring where the file to be written is
    const fileAsABuffer = fs.readFileSync(productFilePath); //uses fs library to retrieve the content of the file in machine language
    const fileAsAString = fileAsABuffer.toString(); //converts the buffer to a string
    const reviewArr = JSON.parse(fileAsAString); //converts the string into json
    const idComingFromRequest = req.params.id; //identifies the id inside the url
    console.log("fetched profile with id ", idComingFromRequest);
    const review = reviewArr.filter((review) => review._id === idComingFromRequest); // filters the result
    console.log("review ", review);
    res.send(review); //sends the response
});

router.put("/:_id/edit/:rid",[
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
    
],  (req, res, next) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            const err = new Error()
            err.message = errors
            err.httpStatusCode = 400
            next(err)
            res.send(errors)
        } else {
            const projectDB = readFile("../products/products.json")
            const idComingFromRequest = req.params.id; //identifies the id inside the url
    console.log("fetched profile with id ", idComingFromRequest);
    const oldproj = projectDB.filter((proj) => proj.ID === idComingFromRequest)
    const oldDate = oldproj[0].createdAt
    console.log(oldproj)
    console.log(oldDate)
    const proj = projectDB.filter((proj) => proj.ID !== idComingFromRequest)
    console.log(proj)
    const newProj = {
        ...req.body,
        ID: uniqid(),
        createdAt: oldDate,
        modifiedAt: new Date(),
      }; 
    console.log('NEW VERSION:', newProj)
    proj.push(newProj)
    fs.writeFileSync(
        path.join(__dirname, "../products/products.json"),
        JSON.stringify(projectDB)
    )

    res.status(201).send({proj})
        } 
        } catch (error) {
            next(error)
        }
});

router.delete("/:id/delete/:rid", (req, res) => {
    const productFilePath = path.join(__dirname, "../products/products.json");
    const fileAsABuffer = fs.readFileSync(productFilePath);
    const fileAsAString = fileAsABuffer.toString();
    const prodArray = JSON.parse(fileAsAString);
    const idComingFromRequest = req.params.id;
    console.log("fetched profile with id ", idComingFromRequest);
    const proj = prodArray.filter((proj) => proj.id !== idComingFromRequest); //filter otu the chosen project
    fs.writeFileSync(productFilePath, JSON.stringify(proj)); //saves file
    res.status(201).send( 'Deleted' )
});

module.exports = router;
