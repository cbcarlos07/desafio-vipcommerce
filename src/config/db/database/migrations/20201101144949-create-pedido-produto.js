'use strict';
const Sequelize = require('sequelize')
module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('pedido_produto', {
        
        pedido_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: 'Codigo do pedido',
          references: { model: 'pedido', key: 'id' },
          onDelete: "CASCADE"
        },
        
        produto_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: 'Codigo do produto',
          references: { model: 'produto', key: 'id' },
          onDelete: "CASCADE"
        },
        qtde: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: 'Quantidade de produto'
          
        },
      });
      
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.dropTable('pedido_produto');
    
  }
};
