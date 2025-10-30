const { expect } = require('chai');
const { bytesToHex } = require('@noble/hashes/utils');
const { Seed } = require('../../../src/wallet/common/seed.js');

const HEX_SEED = 'f29f58aff0b00de2844f7e20bd9eeaacc379150043beeb328335817512b29fbb7184da84a092f842b2a06d72a24a5d28';

describe('seed', () => {
  it('toBytes matches vector', () => {
    const seed = Seed.from(HEX_SEED);
    const seedBytes = seed.toBytes();
    expect(bytesToHex(seedBytes)).to.equal(HEX_SEED);
  });
});
