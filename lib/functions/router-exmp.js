	const express = require('express'),
	    router = express.Router();
	const loadInfo = require('./load-info');

	module.exports = (url, filename, status) => router.all(url, (req, res, next) => {
	    console.log(url, filename, req.url)
	    loadInfo(req, filename);
	    res.status(status).sendfile('NeverSite/public/' + filename);
	})