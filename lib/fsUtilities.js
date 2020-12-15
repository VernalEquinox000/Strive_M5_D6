const { errorMonitor } = require("events")
const { readJSON, writeJSON } = require("fs-extra")
const { join } = require("path")

const productsPath = join(__dirname, "../services/products")

const readDB = async filePath => {

    try {
        const fileJson = await readJSON(filePath)
        return fileJson
    } catch (error) {
        throw new Error(error)
    }
    }

const writeDB = async filePath => {
    try{
    const fileJson = await writeJSON(filePath, fileContent)
} catch (error) {
    throw new Error(error)
}
}

module.exports = {
    getProducts: async () => readDB(productsPath),
    writeProducts: async productsData =>writeDB(productsPath, productsData)
}