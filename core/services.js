setup.services = {}
const { readdirSync } = require('fs')
const fs = require('fs')

const getDirectories = source =>
    readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const apis = getDirectories(__dirname + '/../api');

for(let key in apis){
    setup.services[apis[key]] = {}
    if(!fs.readdirSync(__dirname+`/../api/${apis[key]}/services/`)!==[]){
        for (let i of fs.readdirSync(__dirname+`/../api/${apis[key]}/services/`)){
            var fileName = i.split('.')[0]
            setup.services[apis[key]][fileName] = require(__dirname+`/../api/${apis[key]}/services/`+fileName)
        }
    }
}

// console.log("services", setup.services)