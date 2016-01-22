const http = require('http');
const soap = require('soap');

const spies = {}
let SOAPServer = null

/**
 * Reset all spies
 * @return {[type]} [description]
 */
export function tearDown(){
  httpServer.close()
  SOAPServer.removeAllListeners()
}

function reset() {
  // it need to be cleared without reassigning it to conserve the reference
  //requestCollector.splice(0, requestCollector.length)
}

function setupMockServer(services, opts, cb) {

  //  const c = config.getPath();
  // ------------------------------------------ userClientWSDL
  const wsdl = require('fs').readFileSync(opts.wsdlpath, 'utf8');
  const httpServer = http.createServer();
  httpServer.listen(opts.port, cb);
  SOAPServer = soap.listen(mock1, '/', services, wsdl);
}
