const pageRoute = require('../../lib/functions/router-exmp');
const { e404 } = require('./config');
module.exports = pageRoute(e404, '404.html', 404)