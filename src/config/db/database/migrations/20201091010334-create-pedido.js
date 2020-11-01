'use strict';
const Sequelize = require('sequelize')
module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('pedido', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          comment: 'ID da tabela'
        },
        
        cliente_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: 'Codigo do cliente',
          references: { model: 'cliente', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        dt_pedido: {
          type: Sequelize.DATE,
          allowNull: false,
          comment: 'Data do peddo',
          defaultValue: Sequelize.fn('now')
        },
        observacao: {
          type: Sequelize.TEXT,
          allowNull: true,
          comment: 'Observação'
          
        },
        forma_pagamento_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: 'Codigo da forma de pagamento',
          references: { model: 'forma_pagamento', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
      });
      
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.dropTable('pedido');
    
  }
};
