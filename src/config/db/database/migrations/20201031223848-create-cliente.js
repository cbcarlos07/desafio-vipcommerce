'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('cliente', 
        { 
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: 'ID da tabela'
          },
          nome: {
            type: Sequelize.STRING( 100 ),
            allowNull: false,
            comment: 'Nome do Cliente'
          },          
          cpf: {
            type: Sequelize.STRING( 11 ),
            allowNull: false,
            comment: 'Cpf do Cliente',
            unique : true,
          },
          sexo: {
            type: Sequelize.CHAR( 1 ),
            allowNull: false,
            comment: 'Sexo do Cliente'
          },
          email: {
            type: Sequelize.STRING( 100 ),
            allowNull: false,
            comment: 'E-mail do Cliente',
            unique : true,
          },          
        }
        );
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.dropTable('cliente');
    
  }
};
