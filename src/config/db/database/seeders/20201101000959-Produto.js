
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('produto', [        
        {
          nome: 'Vassoura',
          cor: 'verde',
          tamanho: '62 cm',
          valor: 12.0
        },
        {
          nome: 'Repelente',
          cor: 'azul',
          tamanho: '20 cm',
          valor: 7.0
        },
        {
          nome: 'Refrigerante Fanta Laranja',
          cor: 'laranja',
          tamanho: '15 cm',
          valor: 6.0
        },
        {
          nome: 'Franco',
          cor: 'azul',
          tamanho: '17 cm',
          valor: 8.5
        }
        
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('produto', null, {});
    
  }
};