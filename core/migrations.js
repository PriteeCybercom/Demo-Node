/* For migrations */
const express = require('express')
const path = require('path');
const Confirm = require('prompt-confirm');
const chalk = require('chalk')
var Umzug = require('umzug');
let rootPath = path.resolve(__dirname, '../');
const connection = require('./connection');
require('dotenv').config()
const app = express()
const http = require('http');
const server = http.createServer()

const config = {
  port: 8000,
  launched: false,
};

var umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: {
        sequelize: connection // here should be a sequelize instance, not the Sequelize module
    },
    migrations: {
        // The params that gets passed to the migrations.
        // Might be an array or a synchronous function which returns an array.
        params: [connection.getQueryInterface(), connection.constructor, function() {
            throw new Error('Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.');
        }],
        path: path.join(rootPath, 'db/migrations/')
    }
});

// umzug.down(/*{ to: '20210223113512-create-address' }*/).then(()=>{
//   console.log("downn")
// })

umzug.pending().then(function (migrations) {
    new Confirm('Wanna do migrations?')
    .run()
    .then(function(answer) {
      if(answer){
        if(migrations.length > 0){
          console.log("Pending migrations : ")
          migrations.map(a => console.log(chalk.yellow(a.file)))
          umzug.up().then(function()  {
            console.log(chalk.green('Migration complete!'));
            serverListen(server, config.port);
          }).catch(err => {
            throw `Unable to perform migration due to ${err}`;
          });
        } else {
          console.log(chalk.green("No migrations are pending..."))
          serverListen(server, config.port);
        }
      } else {
        serverListen(server, config.port);
      }
    });
  });

  function serverListen(server, port){
    // server.on('error', e => {
    //   console.log(`port ${config.port} is taken`)
    //   config.port +=1;
    //   server.close();
    //   serverListen(server, config.port);
    // }).listen(port, function() {
    //   if (config.launched){
    //     return;
    //   }
    //   console.log('Listening on port ' + server.address().port);
    //   // launchBrowser();
    //   config.launched = true;
    // });
    
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
              console.log("listening to "+parseInt(freePort))
            })
          }
        })
      } else {
        app.listen(parseInt(freePort),()=>{
          console.log("listening to "+parseInt(freePort))
        })
      }
    });
  }

module.exports = app
// module.exports = {
//   umzug: umzug,
//   app: app
// }