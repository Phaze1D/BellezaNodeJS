var phone = require('phone');

const valmsg = {
  required: 'Necesario',
  email: 'El correo electrónico tiene que ser válida.',
  min: (min) => `Debe tener como mínimo ${min} caracteres`,
  max: (max) => `Debe tener como maximo ${max} caracteres`,
  email_unique: 'El correo electrónico ya esta registrado',
  plu_unique: 'El plu ya esta registrado',
  phone: (value) => {
    if(phone(value, 'MX').length == 0){
      throw new Error('Numero invalido')
    }
  },

}

module.exports = valmsg;
