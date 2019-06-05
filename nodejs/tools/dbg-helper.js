// package dependencies
const debug = require('debug')('rpizero'); // defines library namespace values

const namespaces = ['app', 'bleno', 'noble']; // defines namespace values

namespaces.forEach((namespace) => {
exports[namespace] = debug.extend(namespace); // assigns namespace values dynamically
exports[namespace].log = console.debug.bind(console); // binds to console.debug channel
});
