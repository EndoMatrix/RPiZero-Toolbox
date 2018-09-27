const bleno = require('bleno');
const fs = require('fs');

const file = '/etc/wpa_supplicant/wpa_supplicant.conf'; // https://w1.fi/cgit/hostap/plain/wpa_supplicant/wpa_supplicant.conf

class Characteristic extends bleno.Characteristic {
  constructor(opts) {
    super(opts);
	  
    this.response = null; // data to supply on callback
    this.callback = null; // callback function holder
  }

  /**
   * Gets the WPA supplicant list from the advertising device; should it exist
   * and sufficient read/write permissions have been supplied. 
   * @param {number} offset - the offset in bytes, based on the amount of data already transmitted (i.e for SAR)
   * @param {function} callback - the callback function for transmitting the data
   */
  onReadRequest(offset, callback) {
    fs.open(file, 'r', function(error, filde) {
      if (error) throw error; // throws an error if insufficient read/write permissions are supplied (i.e. user/group) for the specified file

      fs.stat(file, function(error, stats) {
        if (error) throw error; // throws an error if specified file does not exist

        fs.read(filde, Buffer.alloc(stats.size), 0, stats.size, 0, function(error, count, bytes) {
          if (error) throw error; // throws an error if insufficient read permissions are supplied (i.e. user/group) for the specified file

          callback(bleno.Characteristic.RESULT_SUCCESS, bytes.slice(offset)); // delivers complete byte array in multiple segments
        });
      });
    });
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

// obtains the supplicant file for the Wi-Fi PA service
module.exports = new Characteristic({
  uuid: 'A35C64F1-0001-0001-0000-6D2F4064C7FA'.replace(/-/g, ''),
  properties: ['read'],
  descriptors: [
    new bleno.Descriptor({
      uuid: '2901', // characteristic user format
      value: 'Gets the supplicant file for the Wi-Fi PA service' // human-readable description of characteristic
    }),
    new bleno.Descriptor({
      uuid: '2904', // characteristic presentation format
      value: Buffer.from([0x19, 0x00, 0x37, 0x4A, 0x00, 0x00, 0x00]) // 0x19 is UTF-8 string (for credentials)
    })
  ]
});
