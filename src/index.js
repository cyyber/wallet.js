/**
 * Package entry: re-export modules at the root for convenience.
 * @module index
 */

const { DESCRIPTOR_SIZE } = require('./wallet/common/constants.js');
const { getAddressFromPKAndDescriptor } = require('./wallet/common/address.js');
const { ExtendedSeed } = require('./wallet/common/seed.js');
const { newMLDSA87Descriptor } = require('./wallet/ml_dsa_87/descriptor.js');
const { Descriptor } = require('./wallet/common/descriptor.js');
const { newWalletFromExtendedSeed } = require('./wallet/factory.js');
const { Wallet: MLDSA87 } = require('./wallet/ml_dsa_87/wallet.js');
const { Wallet: SPHINCSPLUS256s } = require('./wallet/sphincsplus_256s/wallet.js');

const Wallet = {
  newWalletFromExtendedSeed,
  MLDSA87: typeof MLDSA87,
  SPHICSPLUS256s: typeof SPHINCSPLUS256s,
};

module.exports = {
  ExtendedSeed,
  Descriptor,
  DESCRIPTOR_SIZE,
  newMLDSA87Descriptor,
  getAddressFromPKAndDescriptor,
  Wallet,
};
