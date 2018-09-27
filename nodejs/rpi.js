const bleno = require('bleno');

bleno.setServices([require('./services/wpa.js')], (error) => { if (error) throw error });

const [address] = require('os').networkInterfaces().wlan0;

bleno.on('stateChange', (state) => {
  const UUID_36 = parseInt(address.mac.replace(/:/g, '').substr(-6), 16).toString(36).toUpperCase().stick('-', 4); // hexatridecimal encoding for latter half of MAC address
  const UUID_16 = 'A35F64F1-0000-0000-0000-6D2F4064C7FA'.replace(/-/g, ''); // hexadecimal encoding for Service UUID

  switch (state) {
    case 'poweredOn':
      bleno.startAdvertising('Raspberry Pi ' + UUID_36, [UUID_16]);
      break;
    default:
      bleno.stopAdvertising();
      break;
  }
});

/**
 * Inserts multiple delimiters into a String.
 * @param {string} delimiter - the character(s) to insert
 * @param {...number} indices - the list of locations to insert a delimiter
 * @return {string} the complete string
 */
String.prototype.stick = function(delimiter) {
  if (arguments.length < 2) {
    return this.toString(); // if less than 2 arguments, then no delimiter index has been specified
  }

  let args = new Array(arguments.length - 1) // creates an empty array to store the indices
    .fill(undefined) // initialises every array value as undefined, as map doesn't work otherwise
    .map((x, v) => arguments[v + 1]) // maps every argument index to an array index
    .sort((a, b) => a - b); // sorts the array in order of ascending value

  let that = '';

  that += this.slice(0, args[0]) + delimiter; // adds leading string slice before first delimiter
  for (var i = 0; i < args.length - 1; i++) {
    that += this.slice(args[i], args[i + 1]) + delimiter;
  }
  that += this.slice(args[args.length - 1], this.length); // adds trailing string slice after final delimiter

  return that;
};

