const bleno = require('bleno');

const ble = require('./../../tools/ble-helper.js');

const characteristics = {
  example: new (require('./characteristics/example.js'))()
}

const service = new bleno.PrimaryService({
  uuid: ble.toUUID('A35F64F1-0001-0000-0000-6D2F4064C7FA'),
  characteristics: Object.values(characteristics)
});

module.exports = { service, ...characteristics };
