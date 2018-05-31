const pageRoute = require('../../lib/functions/router-exmp');
const { home } = require('./config');
module.exports = pageRoute(home, 'index.html', 200);