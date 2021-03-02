const Sequelize = require('sequelize');
var config = require('../config/database.json');
console.log(config.development)
config = config["development"];

if(!config){
    console.log("Invalid Database Configuration");
}

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
    logging: config.logging,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
  });

sequelize.authenticate().then(() => {
      console.log("Connection has been established successfully. ")
  })
.catch(err => {
    throw `Unable to connect to the database: ${err}`
});

framework = {connection : sequelize};
  
sequelize.sync();

module.exports = sequelize;