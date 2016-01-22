import * as soapMock from './index'
const services = {
  CurrencyService: {
    CurrencyServicePort: {
      createOrUpdateCurrency: function() {
        return {
          'return': {
            'errorCode': '0',
            'errorMessage': '',
            'status': 'OK',
            'currencyDataModel':
             {
               'creation_user': 'ADMIN2@TESTTENANT2.COM',
               'currencyId': 16,
               'domini': 'localhost2',
               'name': 'TESTCOINS',
               'start_charge': '100',
               'start_tecnic_charge': '100000.00',
               'tecnic_user_id': 'T6AA3DB5C-3A81-4D0C-BB34-83CC953D89EC'
              }
            }
        };
      }
    }
  }
}

const soapServerMock = setupMockServer(services, {  wsdlpath: baseUrl, port: 133131 }, (err, server) => {

  soap.createClient(baseUrl, (err, client) => {

    var xml =
      '<tns:createOrUpdateCurrency>\n'+
      '  <request>\n'+
      '     <currencyModel>\n'+
      '        <creation_user>'+admin.email+'</creation_user>\n'+
      '        <domini>'+tenant.domains[0]+'</domini>\n'+
      '        <name>'+tenant.currencyName+'</name>\n'+
      '        <start_charge>'+tenant.newUserCoins+'</start_charge>\n'+
      '        <start_tecnic_charge>'+START_TECNIC_CHARGE+'</start_tecnic_charge>\n'+
      '     </currencyModel>\n'+
      '     <userData>\n'+
      '        <name>'+admin.firstName+'</name>\n'+
      '        <surname>'+admin.lastName+'</surname>\n'+
      '        <email>'+admin.email+'</email>\n'+
      '        <currency>\n'+
      '           <name>'+tenant.currencyName+'</name>\n'+
      '        </currency>\n'+
      '     </userData>\n'+
      '  </request>\n'+
      '</tns:createOrUpdateCurrency>\n';

    client
      .CurrencyService
      .CurrencyServicePort
      .createOrUpdateCurrency(xml, (err, res) => {
        console.log(err, res);
        process.exit(0)
      }));
  });
})
