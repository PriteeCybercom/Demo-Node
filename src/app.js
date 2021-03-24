global.setup = {}
require('../core/crons')
const app = require('../core/migrations');
require('../config/config')
require('../config/fileUpload')
function findErr(array, key) {
    var arr = []
    for (var i = 0; i < array.length; i++) {
        if (array[i][key]) {
            arr.push(array[i][key]);
        }
    }
    return arr;
}
setup.findErr = findErr

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
require('dotenv').config()
// global.framework={};
require('../core/migrations');
require('../core/functions')
require('../core/services')
const chalk = require('chalk')
const routes = require('../core/routes');

////////////////////////////////////////////////////////////////
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const definition = {
    openapi: '3.0.0',
    info: {
        title: "API",
        description: "API Info",
        contact: {
            name: "Developer"
        },
        servers: ["http://localhost:"+setup.port]
    }
}

const options = {
    definition,
    apis: [__dirname+"/../api/apidoc.js"]
} 

const swaggerDocs = swaggerJsDoc(options);
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }))

app.get('/c', (req, res) => {
    res.send('Hello World!');
});
app.get('/users/:id', (req, res) => {
    res.send('Hello World!');
});
///////////////////////////////////////////////////////////////////////////

for(let key in routes.public){
    app[routes.public[key].method](routes.public[key].path, (routes.public[key].middleware),routes.public[key].globalMiddleware,routes.public[key].action);
}

for(let key in routes.protected){
    app[routes.protected[key].method](routes.protected[key].path, routes.protected[key].middleware, routes.protected[key].globalMiddleware, routes.protected[key].action);
}

app.use(function(req,res,next){
    const err = new Error("Not found")
    err.status = 404
    next(err)
})

app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    console.log(chalk.red('ERROR:')+" Status: "+err.status+", Message: "+err.message)
    var caller_line = err.stack.split("\n")[1];
    var index = caller_line.indexOf("at ");
    var clean = caller_line.slice(index+2, caller_line.length);
    console.log("Error is coming from :",clean)
    res.send({
        error: {
            status: err.status,
            message: err.message
        }
    })
})

process.on('uncaughtException', function (err,origin) {
    console.log(chalk.red('ERROR:')+err+`\nException origin: ${origin}`);
    process.exit(1);
  });
  
  setTimeout(function () {
    // console.log('This will still run.');
  }, 500);
  
  // Intentionally cause an exception, but don't catch it.
//   nonexistentFunc();
//   console.log('This will not run.');
/////////////////////////////////////////////////////////////
