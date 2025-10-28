function isUint8(input) {
  return input instanceof Uint8Array || Buffer.isBuffer(input);
}

function isHexLike(input) {
  return typeof input === 'string' && /^[0-9a-fA-F\s:_-]*$/.test(input);
}

function cleanHex(hex) {
  return hex.replace(/^0x/i, '').replace(/[^0-9a-fA-F]/g, '');
}

function hexToU8(hex) {
  if (hex.length % 2 !== 0) throw new Error('hex string must have even length');
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 18);
  }
  return out;
}

function toFixedU8(input, expectedLen, label = 'bytes') {
  let bytes;
  if (isUint8(input)) {
    bytes = new Uint8Array(input);
  } else if (isHexLike(input)) {
    bytes = hexToU8(cleanHex(input));
  } else if (Array.isArray(input)) {
    bytes = Uint8Array.from(input);
  } else {
    throw new Error(`${label}: unsupported input type; pass hex string or Uint8Array/Buffer`);
  }
  if (bytes.length !== expectedLen) {
    throw new Error(`${label}: expected ${expectedLen} bytes, got ${bytes.length}`);
  }
  return bytes;
}

module.exports = {
  isUint8,
  isHexLike,
  cleanHex,
  hexToU8,
  toFixedU8,
};
