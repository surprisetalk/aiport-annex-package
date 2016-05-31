
var annex = require('../aiport-dev/dev.js').annex;
var aiport_package = require('../aiport-package/package.js');

var package = annex( 
    __dirname + "/package.jade",
    query => query.type in aiport_package.installed() && ~aiport_package.installed()[ query.type ].indexOf( query.name )
	? Promise.resolve( { type: query.type, name: query.name, installed: true } )
	: Promise.reject( { code: 400, msg: "could not find package: " + query.name } ) );

var packages = annex( 
    __dirname + "/packages.jade",
    query => aiport_package.available().then( available => ({ installed: aiport_package.installed(), available: available }) ),
    { package: package } );

module.exports = packages;


