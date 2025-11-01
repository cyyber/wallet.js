/** @typedef {import('../../types/qrl-wallet.js').QRLWallet} QRLWallet */

/** @implements {QRLWallet} */
class Wallet {
  /** @returns {Uint8Array} */ getAddress() {
    throw new Error();
  }

  /** @returns {string} */ getAddressStr() {
    throw new Error();
  }

  /** @returns {Uint8Array} */ getPK() {
    throw new Error();
  }

  /** @returns {Uint8Array} */ getSK() {
    throw new Error();
  }

  /** @param {Uint8Array} message @returns {Uint8Array} */ sign() {
    throw new Error();
  }

  /** @param {ExtendedSeed} @returns {Uint8Array} */ newWalletFromHexSeed() {
    throw new Error();
  }
}

module.exports = {
  Wallet,
};
