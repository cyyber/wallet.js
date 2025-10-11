const mldsa87 = require('./mldsa87.js');
const mnemonic = require('./utils/mnemonic.js');
const wordlist = require('./qrl/wordlist.js');

module.exports = {
  MLDSA87: mldsa87.MLDSA87,
  extractMessage: mldsa87.extractMessage,
  extractSignature: mldsa87.extractSignature,
  getMLDSA87AddressFromPK: mldsa87.getMLDSA87AddressFromPK,
  getMLDSA87Descriptor: mldsa87.getMLDSA87Descriptor,
  isValidMLDSA87Address: mldsa87.isValidMLDSA87Address,
  MnemonicToSeedBin: mnemonic.MnemonicToSeedBin,
  SeedBinToMnemonic: mnemonic.SeedBinToMnemonic,
  WORD_LIST: wordlist.WordList,
};
