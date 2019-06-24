// external dependencies
const bleno = require('bleno');

// internal dependencies
const ble = require('./../../tools/ble-helper');

const characteristics = {
  example: new (require('./characteristics/example'))()
};

const service = new bleno.PrimaryService({
  uuid: ble.toUUID('A35F64F1-0001-0000-0000-6D2F4064C7FA'),
  characteristics: Object.values(characteristics)
});

module.exports = { service, ...characteristics };
