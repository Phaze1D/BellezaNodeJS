'use strict'
let phone = require('phone');
let Sequelize = require('sequelize')
let Promise = require('bluebird');
let gm = require('gm')
Promise.promisifyAll(gm.prototype);

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
  bannerImage: (lg, sm) => {
    return Promise.all([gm(lg).sizeAsync(), gm(sm).sizeAsync()]).then( values => {
      if( !(values[0].width == 940 && values[0].height == 300) ){
        let err = new Sequelize.ValidationError('')
        err.errors.push({path: 'imagelg', message: 'Image must be 940 by 300'})
        return Promise.reject(err)
      }

      if( !(values[1].width == 540 && values[1].height == 300) ){
        let err = new Sequelize.ValidationError('')
        err.errors.push({path: 'imagesm', message: 'Image must be 540 by 300'})
        return Promise.reject(err)
      }

      return values
    })

  }
}

module.exports = valmsg;
