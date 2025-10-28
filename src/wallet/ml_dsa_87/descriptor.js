const { Descriptor, getDescriptorBytes } = require('../common/descriptor.js');
const { WalletType } = require('../common/wallettype.js');

function newMLDSA87Descriptor(metadata = [0, 0]) {
    return new Descriptor(getDescriptorBytes(WalletType.ML_DSA_87, metadata));
}

module.exports = { 
    newMLDSA87Descriptor,
};