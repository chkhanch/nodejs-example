const express = require('express'),
    http = {
        server: express(),
        port: 8181
    },
    https = {
        port: 4444
    };

http.server
    .all('*', (req, res) => {
        res.redirect(`https://${req.hostname}:${https.port}/`)
    });

require('http')
    .createServer(http.server)
    .listen(http.port, () => {
        console.log(`HTTP server runs on ${http.port} port.`)
    });