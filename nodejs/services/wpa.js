const bleno = require('bleno');

module.exports = new bleno.PrimaryService({
  uuid: 'A35F64F1-0001-0000-0000-6D2F4064C7FA'.replace(/-/g, ''),
  characteristics: [
    require('../characteristics/get.js'), // obtains the supplicant file for the Wi-Fi PA service
  ]
});
