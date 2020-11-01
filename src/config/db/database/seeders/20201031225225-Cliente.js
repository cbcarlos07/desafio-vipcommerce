
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('cliente', [
        {
          nome: 'Carlos Bruno',
          cpf: "28984617172",
          sexo: "M",
          email: 'carlos@email.com'
        }
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('cliente', null, {});
    
  }
};