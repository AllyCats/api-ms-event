'use strict';
module.exports = function(app) {
  const controller = require('./controllers/controller');

   app.route('/events')
    .get(controller.getEvents);
}