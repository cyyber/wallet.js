/**
 * Auto-select wallet implementation based on the ExtendedSeed descriptor.
 * Descriptor layout(3 bytes): [ type(uint8), meta0, meta1 ]
 * @module wallet/factory
 */

const { isHexLike } = require('../utils/bytes.js');
const { ExtendedSeed } = require('./common/seed.js');
const { WalletType } = require('./common/wallettype.js');
const { Wallet } = require('./ml_dsa_87/wallet.js');

/**
 * Construct a wallet from an ExtendedSeed by auto-selecting the correct implementation.
 *
 * @param {ExtendedSeed|Uint8Array|string} extendedSeed - ExtendedSeed instance, 51 bytes or hex string.
 * @returns {any} Wallet instance (ML-DSA-87 or SPHINCS+256s)
 */
function newWalletFromExtendedSeed(extendedSeed) {
  let ext;
  if (extendedSeed instanceof Uint8Array || isHexLike(extendedSeed)) {
    ext = ExtendedSeed.from(extendedSeed);
  } else if (extendedSeed instanceof ExtendedSeed) {
    ext = extendedSeed;
  } else {
    throw new Error('Unsupported extendedSeed input');
  }

  const desc = ext.getDescriptor();
  switch (desc.type()) {
    case WalletType.ML_DSA_87:
      return Wallet.newWalletFromExtendedSeed(ext);
    default:
      throw new Error(`Unsupported wallet type in descriptor: ${desc.type()}`);
  }
}

module.exports = {
  newWalletFromExtendedSeed,
};
