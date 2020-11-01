'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('produto', 
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
            comment: 'Nome do produto'
          },
          cor: {
            type: Sequelize.STRING( 100 ),
            allowNull: false,
            comment: 'Nome do produto'
          },
          tamanho: {
            type: Sequelize.STRING( 45 ),
            allowNull: false,
            comment: 'Tamanho do produto'
          },
          valor: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            comment: 'Valor do produto'
          },

          
        }
        );
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.dropTable('produto');
    
  }
};
