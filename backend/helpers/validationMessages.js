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
  },
  productImage: (img1, img2) => {

    if(!(img1 && img2)){
      let err = new Sequelize.ValidationError('')
      err.errors.push({path: 'main_image', message: 'Missing main or second image'})
      return Promise.reject(err)
    }


    return Promise.all([gm(img1).sizeAsync(), gm(img2).sizeAsync()]).then( values => {
      if( !(values[0].width == 830 && values[0].height == 969) ){
        let err = new Sequelize.ValidationError('')
        err.errors.push({path: 'main_image', message: 'Image must be 830 by 969'})
        return Promise.reject(err)
      }

      if( !(values[1].width == 830 && values[1].height == 969) ){
        let err = new Sequelize.ValidationError('')
        err.errors.push({path: 'second_image', message: 'Image must be 830 by 969'})
        return Promise.reject(err)
      }

      let commands = [
        gm(img1).strip().quality('65').interlace('Plane').samplingFactor('4:2:0').colorspace('RGB').toBufferAsync('jpeg'),
        gm(img1).strip().quality('70').resize('696').interlace('Plane').samplingFactor('4:2:0').colorspace('RGB').toBufferAsync('jpeg'),
        gm(img1).strip().quality('75').resize('498').interlace('Plane').samplingFactor('4:2:0').colorspace('RGB').toBufferAsync('jpeg'),
        gm(img1).strip().quality('80').resize('256').interlace('Plane').samplingFactor('4:2:0').colorspace('RGB').toBufferAsync('jpeg'),
        gm(img1).strip().quality('85').resize('164').interlace('Plane').samplingFactor('4:2:0').colorspace('RGB').toBufferAsync('jpeg'),

        gm(img2).strip().quality('65').interlace('Plane').samplingFactor('4:2:0').colorspace('RGB').toBufferAsync('jpeg'),
        gm(img2).strip().quality('70').resize('696').interlace('Plane').samplingFactor('4:2:0').colorspace('RGB').toBufferAsync('jpeg'),
        gm(img2).strip().quality('75').resize('498').interlace('Plane').samplingFactor('4:2:0').colorspace('RGB').toBufferAsync('jpeg'),
        gm(img2).strip().quality('80').resize('256').interlace('Plane').samplingFactor('4:2:0').colorspace('RGB').toBufferAsync('jpeg'),
        gm(img2).strip().quality('85').resize('164').interlace('Plane').samplingFactor('4:2:0').colorspace('RGB').toBufferAsync('jpeg'),
      ]

      return Promise.all(commands)
    })
  }
}

module.exports = valmsg;
