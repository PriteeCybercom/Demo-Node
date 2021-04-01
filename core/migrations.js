console.log("migrate "+new Date())
const path = require('path');
const chalk = require('chalk')
var config = require('../config/database.json');
var Umzug = require('umzug');
let rootPath = path.resolve(__dirname, '../');
require('dotenv').config()

var con = require('./connection');
var connection
async function umzg(){
  return new Promise((resolve,reject)=>{
    let p = new Promise((resolve,reject)=>{
      connection = con.getSequelize()
    })
    p.then(function(value){
    console.log("conn",connection)
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
  })
}
module.exports.umzg = umzg

