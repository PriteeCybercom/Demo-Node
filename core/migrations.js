const path = require('path');
const chalk = require('chalk')
var Umzug = require('umzug');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
let rootPath = path.resolve(__dirname, '../');
require('dotenv').config()


async function umzg(connection){
  return new Promise((resolve,reject)=>{
    try{
      var umzug = new Umzug({
          storage: 'sequelize',
          storageOptions: {
              sequelize: connection 
          },
          migrations: {
              params: [connection.getQueryInterface(), connection.constructor, function() {
                  throw new Error('Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.');
              }],
              path: path.join(rootPath, 'db/migrations/')
          }
      });
      resolve(umzug)
    // umzug.down(/*{ to: '20210223113512-create-address' }*/).then(()=>{
    //   console.log("downn")
    // })
    } catch(err){
      console.log(chalk.red("Error coming between sequelize and umzug connection..."))
    }
  })
}


async function umzgg(umzug){
  return new Promise((resolve,reject)=>{
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
                console.log(chalk.red(`Unable to perform migration`));
              }); 
          } else {
            serverListen(resolve);
            resolve(app)
          }
        });
      } else {
        console.log(chalk.green("No migrations are pending..."))
        serverListen(resolve);
        resolve(app)
      }
      }).catch(err =>{
        console.log(chalk.red("Error coming in migrations..."))
        serverListen(resolve)
        resolve(app)
    })
    
    function serverListen(resolve){
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
              resolve(app)
            }
          })
        } else {
          app.listen(parseInt(freePort),()=>{
            setup.port = parseInt(freePort)
            console.log("listening to "+parseInt(freePort));
          })
          resolve(app)
        }
      })
    }
  })
}


module.exports.umzg = umzg
module.exports.umzgg = umzgg
