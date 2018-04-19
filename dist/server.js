var express = require('express');
var path = require('path');
var httpsRedirect = require('express-https-redirect');
var serveStatic = require('serve-static');

app = express();
app.use(serveStatic(__dirname));
app.use('/', httpsRedirect(true));

var port = process.env.PORT || 5000;
app.listen(port);

console.log('server started '+ port);