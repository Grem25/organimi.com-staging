var $ = {
  express:      require('express'),
  ejs:          require('express-ejs-layouts'),
  nodemailer:   require('nodemailer'),
  requestify:   require('requestify')
};

$.app = require('./server.js').init($);

$.app.run();
