const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: "My API",
        description: "Description"
    },
    host: "localhost:8000",
    schemes: ['http'],
    tags: [
        {
            "name": "students",
            "description": "Endpoints"
        }
    ],
    definitions: {
        students:{
            id: 0,
            name: 'xyz',
            email: 'xyz@abc.df'
        }
    }
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./src/app.js','./api/RV/routes.json']

swaggerAutogen(outputFile, endpointsFiles, doc).then( () => {
    require('./src/app.js')           // Your project's root file
})