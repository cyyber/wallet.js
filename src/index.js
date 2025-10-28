const { DESCRIPTOR_SIZE } = require('./wallet/common/constants.js');
const { getAddressFromPKAndDescriptor } = require('./wallet/common/address.js');
const { Seed } = require('./wallet/common/seed.js');
const { Wallet } = require('./wallet/ml_dsa_87/wallet.js');

module.exports = {
  Seed: Seed,
  MLDSA87: Wallet,
  getAddressFromPKAndDescriptor: getAddressFromPKAndDescriptor,
  DESCRIPTOR_SIZE: DESCRIPTOR_SIZE,
};