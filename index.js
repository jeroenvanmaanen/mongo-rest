/*
	Availble environment options:
	ME_CONFIG_DBSTRING = mongodb://user:password@host:port/database
	ME_CONFIG_READONLY = y  
	ME_CONFIG_APIKEY = apirequestkey
	ME_CONFIG_ROOTURL = /api/
*/


var express = require('express');
var expressMongoRest = require('express-mongo-rest');
var app = express();

var options = {
	origin: '*',
	methods: process.env['ME_CONFIG_READONLY'] ? 'GET,OPTIONS,HEAD' : 'GET,PUT,POST,DELETE,HEAD,OPTIONS',
	headers: 'Content-Type, Authorization, Content-Length, X-Requested-With, X-HTTP-Method-Override',
	apiKey : process.env['ME_CONFIG_APIKEY'] || null ,
	db : process.env['ME_CONFIG_DBSTRING'] || 'mongodb://localhost:27017/test',
	rootURL : process.env['ME_CONFIG_ROOTURL'] || '/api/' 
};

app.use(function(req,res,next) {
	if (options.methods.split(',').indexOf(req.method) != -1) {
		if (options.apiKey && options.apiKey != req.query.apiKey) {
			res.status(403).send();
			return;
		} else {
			delete req.query.apiKey;
		}
		next();
	} else {
		res.status(405).send(); // method not allowed
	}
});

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', options.origin);
	res.setHeader('Access-Control-Allow-Methods', options.methods);
	res.setHeader('Access-Control-Allow-Headers', options.headers);
	next();
});

app.use(options.rootURL, expressMongoRest(options.db));

var server = app.listen(3000, function () {
    console.log('Listening on Port', server.address().port);
})