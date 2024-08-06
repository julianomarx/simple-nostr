// Import the bech32-converting package
const converter = require('bech32-converting');

// Create a converter with the desired prefix (e.g., 'npub')
const npubConverter = converter('npub');
const nsecCOnverter = converter('nsec');

// Convert hex to Bech32
let npub = npubConverter.toBech32('5e3ed675b1be373ebec9c67356696e7069bc8961eb895c1e468624e01a0c9dfc');

// Print the result
console.log(npub);


//converter('eth').toHex('eth1l8st6kf824arncjxlzrhfe4jpyufwvwm5f5cyp')
// 0xf9e0bd5927557a39e246f88774e6b209389731db

exports(npubConverter)