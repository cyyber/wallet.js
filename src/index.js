const mldsa87 = require('./mldsa87.js');
const mnemonic = require('./utils/mnemonic.js');
const wordlist = require('./qrl/wordlist.js');

module.exports = {
  MLDSA87: mldsa87.MLDSA87,
  extractMessage: dilithium.extractMessage,
  extractSignature: dilithium.extractSignature,
  getDilithiumAddressFromPK: dilithium.getDilithiumAddressFromPK,
  getDilithiumDescriptor: dilithium.getDilithiumDescriptor,
  isValidDilithiumAddress: dilithium.isValidDilithiumAddress,
  MnemonicToSeedBin: mnemonic.MnemonicToSeedBin,
  SeedBinToMnemonic: mnemonic.SeedBinToMnemonic,
  WORD_LIST: wordlist.WordList,
};
