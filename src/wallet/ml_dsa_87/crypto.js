const {
  cryptoSignKeypair,
  cryptoSign,
  CryptoBytes,
} = require('@theqrl/mldsa87');

function sign(sk, message) {
    const sm = cryptoSign(message, sk);
    let signature = new Uint8Array(CryptoBytes);
    signature = sm.slice(0, CryptoBytes);
    return signature;
}

function keygen(seed) {
    const pk = new Uint8Array(CryptoPublicKeyBytes);
    const sk = new Uint8Array(CryptoSecretKeyBytes);
    const seedBuf = Buffer.from(seed.HashSHA256());
    cryptoSignKeypair(seedBuf, pk, sk);
    return { pk, sk }
}

module.exports = { 
  keygen, 
  sign,
};
