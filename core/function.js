const fs=require('fs');
const path=require('path');
const basePath=path.join(__dirname,'..','functions');
const files=fs.readdirSync(basePath);

let functions={};

files.forEach(file=>{
    let fileName=file.split('.')[0];
    const {...func}=require(path.join(basePath,fileName));
    functions[fileName]={};
    for(let key in func){
        const method=require(path.join(basePath,fileName))[key];
        functions[fileName][key]=method;
    }
})

setup.functions=functions;

module.exports=functions;
