const morgan=require('morgan');
const config = require('./config.json')['morgan-config']

async function morgn(app){
  return new Promise((resolve,reject)=>{
    morgan.token('req-headers', function(req,res){
      return JSON.stringify(req.headers)
    }) 
    morgan.token('req-body', function(req,res){
      return JSON.stringify(req.body)
    })  
    if(config.length===1 && config[0] === "req-headers"){
      app.use(morgan(':remote-addr - ":method :url HTTP/:http-version" :status :req-headers :res[content-length] [:date[clf]]'))
    } else if(config.length===1 && config[0] === "req-body"){
      app.use(morgan(':remote-addr - ":method :url HTTP/:http-version" :status :req-body :res[content-length] [:date[clf]]'))
    } else if(config.length===2 && config.includes("req-body") && config.includes("req-headers")){
      app.use(morgan(':remote-addr - ":method :url HTTP/:http-version" :status :req-headers :req-body :res[content-length] [:date[clf]]'))
    } else {
      app.use(morgan(':remote-addr - ":method :url HTTP/:http-version" :status :res[content-length] [:date[clf]]'))
    }
    resolve(app)
  })
}
module.exports.morgn = morgn