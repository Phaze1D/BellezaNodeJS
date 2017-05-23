'use strict'
let phone = require('phone');

const valmsg = {
  required: 'Necesario',
  email: 'El correo electrónico tiene que ser válida.',
  min: (min) => `Debe tener como mínimo ${min}`,
  max: (max) => `Debe tener como maximo ${max}`,
  email_unique: 'El correo electrónico ya esta registrado',
  plu_unique: 'El plu ya esta registrado',
  len: (min, max) => `Debe tener entre ${min} y ${max} caracteres`,
  phone: (value) => {
    if(phone(value, 'MX').length == 0){
      throw new Error('Numero invalido')
    }
  },

}

module.exports = valmsg;
