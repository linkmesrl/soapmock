'use strict';

const http = require('http');
const soap = require('soap');
const sinon = require('sinon');
const _ = require('lodash');
_.mixin(require("lodash-deep"));

var spies = {

}

function spies(){}

let SOAPServer = null
/**
 * Reset all spies
 * @return {[type]} [description]
 */
//export function tearDown(){
function tearDown(){
  httpServer.close()
  SOAPServer.removeAllListeners()
}

function reset() {
  // it need to be cleared without reassigning it to conserve the reference
  //requestCollector.splice(0, requestCollector.length)
}

exports.setupMockServer = function (services, opts, cb) {
	console.log(services)
	var obj = _.deepFind(services)
	var methodsNameArray = []
	var methodToSpy = null

	//var obj2 = _.deepFind(obj)
	while (methodsNameArray.length < 1) {
		obj = _.deepFind(obj)
		if (_.isFunction(obj)) {
			methodsNameArray = _.functions(obj)
			methodToSpy = _.deepFilter(obj)
		}
	}
	console.log(methodToSpy)
	_.forEach(methodsNameArray, function(value, key){
		console.log(value);
		spies[value] = sinon.spy(value)
	})

  //  const c = config.getPath();
  // ------------------------------------------ userClientWSDL
  const wsdl = require('fs').readFileSync(opts.wsdlpath, 'utf8');
  const httpServer = http.createServer();
  httpServer.listen(opts.port, cb);
  SOAPServer = soap.listen(httpServer, '/', services, wsdl);
}
