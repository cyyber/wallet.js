const { SHAKE } = require('sha3');
const { sha256 } = require('@noble/hashes/sha2.js');
const randomBytes = require('randombytes');

const {
  cryptoSign,
  cryptoSignKeypair,
  cryptoSignOpen,
  cryptoSignVerify,
  CryptoPublicKeyBytes,
  CryptoSecretKeyBytes,
  CryptoBytes,
} = require('@theqrl/mldsa87');
const { SeedBinToMnemonic } = require('./utils/mnemonic.js');

const ADDRESS_SIZE = 20;
const DESCRIPTOR_SIZE = 3;

function getMLDSA87Descriptor() {
  /*
        In case of MLDSA87 address, it doesn't have any choice of hashFunction,
        height, addrFormatType. Thus keeping all those values to 0 and assigning
        only signatureType in the descriptor.
    */
  // if (!address) {
  //   throw new Error('Address is not defined');
  // }
  const d = new Uint8Array(DESCRIPTOR_SIZE);
  d[0] = 1;
  d[1] = 0;
  d[2] = 0;
  return d;
}

function getMLDSA87AddressFromPK(pk) {
  const pkBuf = Buffer.from(pk);
  const descBytes = getMLDSA87Descriptor();
  const descBuf = Buffer.from(descBytes);

  const preimage = Buffer.concat([descBuf, pkBuf])

  const hasher = new SHAKE(256);
  hasher.update(preimage);
  let digest32 = hasher.digest({ buffer: Buffer.alloc(32), encoding: 'hex' });
  
  const address = new Uint8Array(ADDRESS_SIZE);
  for (let i = 0; i < ADDRESS_SIZE; i++) {
    address[i] = digest32[i];
  }
  return address;
}

class MLDSA87 {
  constructor(seed = null) {
    this.pk = null;
    this.sk = null;
    this.seed = seed;
    this.randomizedSigning = false;
    if (this.seed === null) {
      this.create();
    } else {
      this.fromSeed();
    }
  }

  create() {
    const pk = new Uint8Array(CryptoPublicKeyBytes);
    const sk = new Uint8Array(CryptoSecretKeyBytes);
    const seed = randomBytes(48);
    const seedBuf = Buffer.from(sha256(seed));
    cryptoSignKeypair(seedBuf, pk, sk);
    this.pk = pk;
    this.sk = sk;
    this.seed = seed;
  }

  fromSeed() {
    const pk = new Uint8Array(CryptoPublicKeyBytes);
    const sk = new Uint8Array(CryptoSecretKeyBytes);
    const seedBuf = Buffer.from(sha256(this.seed));
    cryptoSignKeypair(seedBuf, pk, sk);
    this.pk = pk;
    this.sk = sk;
  }

  getPK() {
    return this.pk;
  }

  getSK() {
    return this.sk;
  }

  getSeed() {
    return this.seed;
  }

  getHexSeed() {
    return `0x${this.seed.toString('hex')}`;
  }

  getMnemonic() {
    return SeedBinToMnemonic(this.seed);
  }

  getAddress() {
    return getMLDSA87AddressFromPK(this.pk);
  }

  // Seal the message, returns signature attached with message.
  seal(message) {
    return cryptoSign(message, this.sk, this.randomizedSigning);
  }

  // Sign the message, and return a detached signature. Detached signatures are
  // variable sized, but never larger than SIG_SIZE_PACKED.
  sign(message) {
    const sm = cryptoSign(message, this.sk);
    let signature = new Uint8Array(CryptoBytes);
    signature = sm.slice(0, CryptoBytes);
    return signature;
  }
}

// Open the sealed message m. Returns the original message sealed with signature.
// In case the signature is invalid, nil is returned.
function openMessage(signatureMessage, pk) {
  return cryptoSignOpen(signatureMessage, pk);
}

function verifyMessage(message, signature, pk) {
  return cryptoSignVerify(signature, message, pk);
}

// ExtractMessage extracts message from Signature attached with message.
function extractMessage(signatureMessage) {
  return signatureMessage.slice(CryptoBytes, signatureMessage.length);
}

// ExtractSignature extracts signature from Signature attached with message.
function extractSignature(signatureMessage) {
  return signatureMessage.slice(0, CryptoBytes);
}

function isValidMLDSA87Address(address) {
  // const d = getMLDSA87Descriptor(address);
  // if (address[0] !== d) {
  //   return false;
  // }
  // TODO: Add checksum
  return true;
}

module.exports = {
  MLDSA87,
  getMLDSA87AddressFromPK,
  getMLDSA87Descriptor,
  openMessage,
  verifyMessage,
  extractMessage,
  extractSignature,
  isValidMLDSA87Address,
};
