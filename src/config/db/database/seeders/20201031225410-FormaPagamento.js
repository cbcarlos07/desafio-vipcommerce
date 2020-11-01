
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('forma_pagamento', [        
        {
          nome: 'Dinheiro'
        },
        {
          nome: 'Cartão de Crédito'
        },
        {
          nome: 'Cheque'
        }
        
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('forma_pagamento', null, {});
    
  }
};