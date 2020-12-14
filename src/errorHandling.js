/* const badRequest = (err, req, res, next) => {
  console.log("I am in badRequest ")
    if (err.httpStatusCode === 400) {
      res.status(400).send(err)
    }
    next(err)
  }

const notFoundHandler = (err, req, res, next) => {
  console.log("I am in notFoundHandler ")
    if (err.httpStatusCode === 404) {
      res.status(404).send("Not found!")
    }
    next(err)
  }
  
  const unauthorizedHandler = (err, req, res, next) => {
    console.log("I am in unauthorizedHandler ")
    if (err.httpStatusCode === 401) {
      res.status(401).send("Unauthorized!")
    }
    next(err)
  }
  
  const forbiddenHandler = (err, req, res, next) => {
    console.log("I am in forbiddenHandler ")
    if (err.httpStatusCode === 403) {
      res.status(403).send("Forbidden!")
    }
    next(err)
  }
  
  const catchAllHandler = (err, req, res, next) => {
    console.log("I am in catchAllHandler ")
    if (err.httpStatusCode === 500) {
      res.status(err.httpStatusCode || 500).send(err)
    }
    next(err)
  }

  const routeNotFound = (err, req, res, next) => {
    console.log("I am in routeNotFound ")
    if (!req.route) {
      res.status(err.httpStatusCode || 404).send("This route is not exists yet")
    }
  }
  
  
  module.exports = {
    notFoundHandler,
    unauthorizedHandler,
    forbiddenHandler,
    catchAllHandler,
    badRequest,
    routeNotFound,
  } */
const notFoundErrorHandler = (err, req, res, next) => {
    if(err.httpStatusCode ===404) {
        res.status(404).send("Error! Not found!")
        next(err)
        }
}

const unauthorizedErrorHandler = (err, req, res, next) => {
    if(err.httpStatusCode ===401)  {
        res.status(401).send("Error! Not authorized!")
        } next(err)
}

const forbiddenErrorHandler = (err, req, res, next) => {
    if (err.httpStatusCode === 403) {
        res.status(403).send("Error! Forbidden!")
    } next(err)
}

const badRequestErrorHandler = (err, req, res, next) => {
    if (err.httpStatusCode === 500) {
        res.status(400).send(err.message)
    } next(err)
}

const catchAllErrorHandler = (err, req, res, next) => {
    if (!res.headerSent) {// check if someone already sent a response
        res.status(err.httpStatusCode || 500).send("Generic! Server Error!")
        }
    }


module.exports = {
    notFoundErrorHandler,
    unauthorizedErrorHandler,
    forbiddenErrorHandler,
    badRequestErrorHandler,
    catchAllErrorHandler,

}

