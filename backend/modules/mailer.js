const nodemailer = require("nodemailer")
const hbs = require('nodemailer-express-handlebars')
const {host, port, user, pass} = require('../config/mail.json')
const path = require('path')

const transport = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass }
  });

  const handlebarOptions = {
    viewEngine: {
      extName: '.html',
      partialsDir: path.resolve('./resources/mail/'),
      layoutsDir: '',
      defaultLayout: '',
    },
    viewPath: path.resolve('./resources/mail/'),
    extName: '.html',
  };

transport.use('compile', hbs(handlebarOptions))

  module.exports = transport;