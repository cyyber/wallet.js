const { DESCRIPTOR_SIZE } = require('./wallet/common/constants.js');
const { getAddressFromPKAndDescriptor } = require('./wallet/common/address.js');
const { Seed } = require('./wallet/common/seed.js');
const { Wallet } = require('./wallet/ml_dsa_87/wallet.js');

module.exports = {
  Seed,
  MLDSA87: Wallet,
  getAddressFromPKAndDescriptor,
  DESCRIPTOR_SIZE,
};
