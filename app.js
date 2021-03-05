require('dotenv').config();
const umzug=require('./core/migration');
const express=require('express');
const app=express();
const chalk=require('chalk');
const Confirm=require('prompt-confirm');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const routes=require('./core/routes');
const fp=require('find-free-port');
const find = require('find-process')
const http = require('http')

const getPort = require('get-port');

//Middleware
app.use(bodyParser.json());
app.use(cookieParser());


//Routes
for(let route of routes){
        app[route.method](route.path,route.middlewares,route.action);
}


//migration
umzug.pending()
.then(migrations=>{
    if(migrations.length!=0){
        console.log(`All pending migrations are`);
        for(let migration of migrations){
            console.log(chalk.yellow(migration.file));
        }
        new Confirm('Do you want to migrate all the pending migrations (yes)?')
        .run()
        .then(answer=>{
            if(answer){
                umzug.up()
                .then(()=>{
                    console.log(chalk.green('Migration completed!'));
                    listenServer()
                })
            }
        })
    }else{
        console.log(chalk.green('No pending migrations'));
            listenServer();
    }
})






//my server

let PORT=parseInt(process.env.PORT);
/* getPort({port:PORT})
.then(port=>{
    PORT=port;
}); */

process.on('uncaughtException', (error) => {
    if (error.code === 'EADDRINUSE') {
        let freeport='';
        fp(PORT).then(([freep]) => {

            new Confirm(`Port no ${PORT} is busy.Do you want to run it on the avalibale port (${freep})?`)
            .run()
            .then(answer=>{
                if(answer){
                    PORT=parseInt(freep);
                    listenServer(); 
                }
            })
        })
        /* console.log(`${PORT} already in use want to use ${freeport}`)
        PORT=parseInt(freeport); */
       // listenServer(); 
    }
})  

console.log(process.cwd());

function listenServer(){
   app.listen(PORT,()=>{
        console.log(chalk.green(`server is listenining on port ${PORT}`));
    })     
}



