const Characteristic = require('./../../../node_modules/bleno/lib/characteristic'); // require directly, as bleno causes issues with chai
const Descriptor = require('./../../../node_modules/bleno/lib/descriptor'); // require directly, as bleno causes issues with chai

const ble = require('./../../../tools/ble-helper');

const opts = {
  uuid: ble.toUUID('A35C64F1-0001-0001-0000-6D2F4064C7FA'),
  properties: ['read', 'write', 'notify'],
  descriptors: [
    new Descriptor({
      uuid: '2901', // characteristic user format
      value: 'An example characteristic for read, write and notify capabilities' // human-readable description of characteristic
    }),
    new Descriptor({
      uuid: '2904', // characteristic presentation format
      value: Buffer.from([0x19, 0x00, 0x37, 0x4A, 0x00, 0x00, 0x00]) // 0x19 is UTF-8 string (for credentials)
    })
  ]
}

class C extends Characteristic {
  constructor(opts) {
    super(opts);

    this._response = null; // data to supply on callback
    this._callback = null; // callback function holder
  }

  get callback() {
    return this._callback; // assigns getter to callback attribute
  }

  set callback(args) {
    this._callback = args; // assigns setter to callback attribute
  }

  onSubscribe(size, callback) {
    this.callback = callback;
    console.info('Subscribed to', this);
  }

  onUnsubscribe() {
    this.callback = null;
    console.info('Unsubscribed from', this);
  }
}

module.exports = C;
