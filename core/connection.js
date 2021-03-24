const chalk = require('chalk');
const Sequelize = require('sequelize');
var config = require('../config/database.json');
const Op = Sequelize.Op
if(config.development){
    config = config.development
} else {
    config = config.production
}

var flag;
// if(!config.database){
//     console.log("You have not done db configuration...");
// }
// else {

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
    logging: console.log,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
  })

sequelize.authenticate().then(() => {
      console.log(chalk.green("Connection has been established successfully. "))
      flag = true
  })
.catch(err => {
    console.log(chalk.red('ERROR:')+" Unable to connect with the database")
});

// framework = {connection : sequelize};
  
sequelize.sync();

// if(flag){
    module.exports = sequelize;
// } else {
//     module.exports = flag;
// }



// }
