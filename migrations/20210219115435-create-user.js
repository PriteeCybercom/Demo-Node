'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING(50),
        allowNull:false
      },
      lastName: {
        type: Sequelize.STRING(50)
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull:false
      },
      password:{
        type: Sequelize.STRING(100),
        allowNull:false
      },
      isActive:{
        type:Sequelize.ENUM('1','0'),
        defaultValue:'0'
      },
      city:{
        type: Sequelize.STRING(50)
      },
      state:{
        type: Sequelize.STRING(50)
      },
      address:{
        type: Sequelize.STRING(200)
      },
      phoneno:{
        type: Sequelize.STRING(30)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};