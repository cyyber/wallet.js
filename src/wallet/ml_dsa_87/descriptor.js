const { Descriptor, GetDescriptorBytes } = require('../common/descriptor.js');
const { WalletType } = require('../common/wallettype.js');

function NewMLDSA87Descriptor(metadata = [0, 0]) {
    return new Descriptor(GetDescriptorBytes(WalletType.ML_DSA_87, metadata));
}

module.exports = { 
    NewMLDSA87Descriptor,
};