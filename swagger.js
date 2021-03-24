const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: "My API",
        description: "Description"
    },
    host: "localhost:8000",
    schemes: ['http']
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./src/app.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then( () => {
    require('./src/app.js')           // Your project's root file
})