global.setup = {}
// require('../core/crons')
const express = require('express')
const app = express()
const Confirm = require('prompt-confirm');
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

require('dotenv').config()
// global.framework={};
// require('../core/migrations');
require('../core/functions')
require('../core/services')
const chalk = require('chalk')
// require('../config/config')
const routes = require('../core/routes');
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
////////////////////////////////////////////////////////////////

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger-output.json')
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

////////////////////////////////////////////////////////////////
// const swaggerJsDoc = require('swagger-jsdoc')
// const swaggerUi = require('swagger-ui-express')
// try{
// const definition = {
//     openapi: '3.0.0',
//     info: {
//         title: "API",
//         description: "API Info",
//         contact: {
//             name: "Developer"
//         },
//         servers: ["http://localhost:"+setu.port]
//     }
// }

// const options = {
//     definition,
//     apis: [__dirname+"/../api/apidoc.js"]
// } 

// const swaggerDocs = swaggerJsDoc(options);
// app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }))
// } catch(err){
//     console.log(chalk.red("ERROR:")+err)
// }
//////////////////////////////////////////////////////////////////////////////////////////
const stundetData = [{
    id: 1,
    name: 'Hiral'
},{
    id: 2,
    name: 'harsh'
}]
app.get('/c', (req, res) => {
    res.send('Hello World!');
});
app.get('/users/:id', (req, res) => {
    /*  #swagger.tags = ['students']
        #swagger.description = 'Endpoint to get the specific user.' */
    /* #swagger.responses[200] = { 
            schema: { "$ref": "#/definitions/students" },
            description: "User found successfully." } */
    res.send(stundetData.map(x=> Object.values(x)))
});
///////////////////////////////////////////////////////////////////////////
try{
    for(let key in routes.public){    
        app[routes.public[key].method](routes.public[key].path, (routes.public[key].middleware),routes.public[key].globalMiddleware,routes.public[key].action);
    }

    for(let key in routes.protected){
        app[routes.protected[key].method](routes.protected[key].path, routes.protected[key].middleware, routes.protected[key].globalMiddleware, routes.protected[key].action);
    }
} catch(err){
    console.log(chalk.red("ERROR:")+err)
}
// app.use(function(req,res,next){
//     const err = new Error("Not found")
//     err.status = 404
//     next(err)
// })

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

var umzug
let promise = new Promise((resolve,reject)=>{
    umzug = require('../core/migrations').umzg()
})
promise.then(function(value){
umzug.pending().then(function (migrations) {
    if(migrations.length>0){
      new Confirm('Wanna do migrations?')
      .run()
      .then(function(answer) {
        if(answer){
            console.log("Pending migrations : ")
            migrations.map(a => console.log(chalk.yellow(a.file)))
            umzug.up().then(function()  {
              console.log(chalk.green('Migration complete!'));
              serverListen();
            }).catch(err => {
              throw `Unable to perform migration due to`;
            }); 
        } else {
          serverListen();
        }
      });
    } else {
      console.log(chalk.green("No migrations are pending..."))
      serverListen();
    }
    }).catch(err =>{
      console.log(chalk.red("Error coming in migrations..."))
      serverListen()
})

function serverListen(){
    var fp = require("find-free-port")
    var portt = process.env.PORT
    fp(parseInt(portt), function(err, freePort){
      if(parseInt(freePort) !== parseInt(portt)){
        console.log(chalk.black.bgYellowBright('WARNING:')+`${parseInt(portt)} is not free`)
        new Confirm('Wanna run the server on nearer port?')
        .run()
        .then(function(answer) {
          if(answer){
            app.listen(parseInt(freePort),()=>{
              setup.port = parseInt(freePort)
              console.log("listening to "+parseInt(freePort))
            })
          }
        })
      } else {
        app.listen(parseInt(freePort),()=>{
          setup.port = parseInt(freePort)
          console.log("listening to "+parseInt(freePort));
        })
      }
    })
}
})

process.on('uncaughtException', function (err,origin) {
    console.log(chalk.red('ERROR:')+process.stderr.fd+','+err+`\nException origin: ${origin}`);
    process.exit(1);
  });
  
  setTimeout(function () {
    // console.log('This will still run.');
  }, 500);
  
  // Intentionally cause an exception, but don't catch it.
//   nonexistentFunc();
//   console.log('This will not run.');
/////////////////////////////////////////////////////////////
module.exports = app