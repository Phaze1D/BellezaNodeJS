'use strict'
let nodemailer = require('nodemailer');
let aws = require('aws-sdk');


module.exports = {
  sendEmail: (to, content, sesConfig) => {
    let transporter = nodemailer.createTransport({
        SES: new aws.SES(sesConfig)
    });

    // send some mail
    transporter.sendMail({
        from: 'Belleza Organica <clientes@bellezaorganica.com.mx>',
        to: to,
        subject: 'Información del Pedido',
        html: content,
    }, (err, info) => {
        transporter.close();
    });
  }
}
