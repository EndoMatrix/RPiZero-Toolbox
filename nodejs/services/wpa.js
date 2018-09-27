const bleno = require('bleno');

module.exports = new bleno.PrimaryService({
  uuid: '303A64F1-0000-0000-0000-95B1F4064C7F'.replace(/-/g, ''),
  characteristics: [
    require('../characteristics/get.js'), // obtains the supplicant file for the Wi-Fi PA service
  ]
});
