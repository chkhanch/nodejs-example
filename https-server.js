const express = require('express');
const https = express();

const cookies = require('cookie-parser')();
const path = require('path');

https.set('port', 4444)

const fileUpload = require('express-fileupload')({
    safeFileNames: true,
    preserveExtension: true
});
const compression = require('compression')(9);
const staticDir = path.join(__dirname, '/NeverSite/public');

const { checkAccess } = require('./lib/functions/function');

/*                 PAGES                */
const {
    home,
    e404
} = require('./routes/pages')
    /*              AJAX                 */
const {
    posts,
    ajax,
    login,
    singup,
    upload,
    edit
} = require('./routes/ajax');

const accessExpresstions = [
    /192.168.[88|89].*/,
    /127.0.0.1/
];
const admin = require('./admin')(accessExpresstions);

https
    .disable('x-powered-by')
    .use(compression)
    .use(cookies)
    .use('/admin', admin)
    .use(fileUpload)
    .use(express.static(staticDir))
    .use((req, res, next) => {
        if (!req.cookies.user)
            if (checkAccess(accessExpresstions))
                res.cookie('user', 'admin');
        next();
    })
    .all(...home)
    .get(...posts)
    .post(...ajax)
    .post(...login)
    .post(...singup)
    .post(...upload)
    .post(...edit)
    .all(...e404);

require('spdy')
    .createServer(require('./ssl'), https)
    .listen(https.get('port'), () => {
        console.log(`HTTPS server runs on ${https.get('port')} port.`)
    });