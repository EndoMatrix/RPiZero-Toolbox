const bleno = require('bleno');

const run = require('./services/run/service.js');
const ble = require('./tools/ble-helper.js');

bleno.setServices([run.service], (error) => {
  if (error) throw error
});

const [address] = require('os').networkInterfaces().wlan0;

bleno.on('stateChange', (state) => {
  const UUID_36 = parseInt(address.mac.replace(/:/g, '').substr(-6), 16).toString(36).toUpperCase(); // hexatridecimal encoding for latter half of MAC address
  const UUID_16 = ble.toUUID('A35F64F1-0000-0000-0000-6D2F4064C7FA'); // hexadecimal encoding for Service UUID

  switch (state) {
    case 'poweredOn':
      bleno.startAdvertising('Raspberry Pi ' + UUID_36, [UUID_16]);
      break;
    default:
      bleno.stopAdvertising();
      break;
  }
});
