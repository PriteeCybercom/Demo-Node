setup.functions = {}
const chalk = require('chalk')
const fs = require('fs')
var root = __dirname + '/../functions'

var files = []
var modules = fs.readdirSync(root);
if(modules!==[]){
  for(let i of modules){
    if(fs.statSync(root+'/'+i).isDirectory()){
      directory(root+'/'+i)
    } else {
      filles(root+'/'+i)
    }
  }
}

function directory(dirr){
  var dir = dirr
  for(let j of fs.readdirSync(dir)){
    if(fs.statSync(dir+'/'+j).isDirectory()){
      dir = dir+'/'+j
      directory(dir)
    } else {
      filles(dir+'/'+j)
    }
  }
}

function filles(i){
  files.push(i)
}

if(files!==[]){
  for (let i of files){
    assign(setup.functions,(i.toString().split('functions/')[1]).split('/') ,i);
  }
} else {
  console.log(chalk.black.bgYellowBright('WARNING:')+' No function files are available')
}

function assign(obj, keyPath, value) {
    var lastKeyIndex = keyPath.length-1;
    for (var i = 0; i < lastKeyIndex; ++ i) {
      var key = keyPath[i];
      if (!(key in obj)){
        obj[key] = {}
      }
      obj = obj[key];
    }
    if(keyPath[lastKeyIndex].includes('.js')){
        keyPath[lastKeyIndex] = keyPath[lastKeyIndex].split('.')[0]
    }
    obj[keyPath[lastKeyIndex]] = require(value.split('.js')[0]);
 }

// console.log("setuppp",setup.functions.funcFile)