'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('forma_pagamento', 
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
            comment: 'Nome da forma de pagamento'
          },          
          
        }
        );
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.dropTable('forma_pagamento');
    
  }
};
