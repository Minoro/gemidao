var express = require('express');
var path = require('path');
var secure = require('ssl-express-www');
var serveStatic = require('serve-static');

app = express();
app.use(serveStatic(__dirname));
app.use(secure);

var port = process.env.PORT || 5000;
app.listen(port);

console.log('server started '+ port);