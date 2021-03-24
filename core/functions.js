setup.functions = {}
const chalk = require('chalk')
const fs = require('fs')
var root = __dirname + '/../functions'
// const glob = require("glob");

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

// var getDirectories = function (root, callback) {
//   glob(root + '/**/*.js', callback);
// };
// getDirectories(root, function (err, res) {
//   if (err) {
//     console.log('Error', err);
//   } else {
//     console.log("res",res);
//     if(res!==[]){
//         for (let i of res){
//             console.log("ii",(i.toString().split('functions/')[1]).split('/').slice(0,-1))
//             // assign(setup.functions,(i.toString().split('functions/')[1]).split('/') ,i);
//             var keyPath = (i.toString().split('functions/')[1]).split('/')
//             var value = i
//             var obj = setup.functions
//             var lastKeyIndex = keyPath.length-1;
//             for (var j = 0; j < lastKeyIndex; ++ j) {
//               var key = keyPath[j];
//               if (!(key in obj)){
//                 obj[key] = {}
//               }
//               obj = obj[key];
//             }
//             if(keyPath[lastKeyIndex].includes('.js')){
//                 keyPath[lastKeyIndex] = keyPath[lastKeyIndex].split('.')[0]
//             }
//             obj[keyPath[lastKeyIndex]] = require(value.split('.js')[0]);
//             console.log("sett",setup)
//         }
//     } else {
//         console.log(chalk.black.bgYellowBright('WARNING:')+' No function files are available')
//     }
//   }
// });

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

console.log("setuppp",setup.functions.funcFile)