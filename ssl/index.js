const fs = require('fs');

module.exports = {
    key: fs.readFileSync(`${__dirname}/private.key`),
    cert: fs.readFileSync(`${__dirname}/certificate.crt`),
    ca: fs.readFileSync(`${__dirname}/ca_bundle.crt`)
};