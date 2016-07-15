
var annex = require('../aiport-dev/dev.js').annex;
var aiport_package = require('../aiport-package/package.js');

var package_exists = 
    ( source, package_type, package_name ) =>
	package_type in source && ~source[ package_type ].indexOf( package_name );

var package = annex( 
    __dirname + "/package.jade",
    query => aiport_package.available().then( 
	available => package_exists( available, query.type, query.name )
	    ? Promise.resolve( { type: query.type, name: query.name, installed: package_exists( aiport_package.installed(), query.type, query.name ) } ) 
	    : Promise.reject( { code: 400, msg: "could not find package in npm: " + query.type + "-" + query.name } ) ) );

var packages = annex( 
    __dirname + "/packages.jade",
    query => aiport_package.available().then( available => ({ installed: aiport_package.installed(), available: available }) ),
    { package: package } );

module.exports = packages;


