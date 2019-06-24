const debug = require('./tools/dbg-helper');

const run = async (debug) => {
  debug.app('fetching external modules...');
  const bleno = require('bleno');
  debug.app('success!');

  debug.app('fetching internal modules...');
  const ble = require('./tools/ble-helper');
  const run = require('./services/run/service');
  debug.app('success!');

  debug.bleno('bleno');
  debug.noble('noble');

  debug.app('init');
  bleno.setServices([run.service], (error) => {
    if (error) debug.bleno(error);
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
};

run(debug);
