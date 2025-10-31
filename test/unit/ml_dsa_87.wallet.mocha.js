const { expect } = require('chai');
const { walletTestCases } = require('../fixtures/ml_dsa_87.fixtures.js');
const { ExtendedSeed } = require('../../src/wallet/common/seed.js');
const { Wallet } = require('../../src/wallet/ml_dsa_87/wallet.js');
const { DESCRIPTOR_SIZE } = require('../../src/wallet/common/constants.js');

function createWalletFromSeed(tc) {
  const ext = ExtendedSeed.from(tc.extendedSeed);
  const seed = ext.getSeed();
  return Wallet.newWalletFromSeed(seed);
}

function createWalletFromExtendedSeed(tc) {
  const ext = ExtendedSeed.from(tc.extendedSeed);
  return Wallet.newWalletFromExtendedSeed(ext);
}

function createWalletFromMnemonic(tc) {
  return Wallet.newWalletFromMnemonic(tc.wantMnemonic);
}

const walletCreators = {
  FromSeed: createWalletFromSeed,
  FromExtendedSeed: createWalletFromExtendedSeed,
  FromMnemonic: createWalletFromMnemonic,
};

describe('ML-DSA-87 Wallet', () => {
  it('newWallet() creates a wallet(random)', () => {
    const w = Wallet.newWallet();
    expect(w).to.be.ok;
    expect(w.getPK()).to.be.instanceof(Uint8Array);
    expect(w.getSK()).to.be.instanceof(Uint8Array);
  });

  describe('Seed bytes equal extendedSeed sans 3-byte descriptor', () => {
    for (const [creatorName, creator] of Object.entries(walletCreators)) {
      for (const tc of walletTestCases) {
        it(`${creatorName} - ${tc.name}`, () => {
          const w = creator(tc);
          const got = Buffer.from(w.getSeed().toBytes()).toString('hex');
          const want = tc.extendedSeed.slice(DESCRIPTOR_SIZE * 2);
          expect(got).to.equal(want);
        });
      }
    }
  });

  describe('ExtendedSeed bytes match vectors', () => {
    for (const [creatorName, creator] of Object.entries(walletCreators)) {
      for (const tc of walletTestCases) {
        it(`${creatorName} - ${tc.name}`, () => {
          const w = creator(tc);
          const got = Buffer.from(w.getExtendedSeed().toBytes()).toString('hex');
          expect(got).to.equal(tc.extendedSeed);
        });
      }
    }
  });

  describe('HexExtendedSeed is "0x" + extendedSeed', () => {
    for (const [creatorName, creator] of Object.entries(walletCreators)) {
      for (const tc of walletTestCases) {
        it(`${creatorName} - ${tc.name}`, () => {
          const w = creator(tc);
          expect(w.getHexExtendedSeed()).to.equal(`0x${tc.extendedSeed}`);
        });
      }
    }
  });

  describe('Mnemonic matches vectors', () => {
    for (const [creatorName, creator] of Object.entries(walletCreators)) {
      for (const tc of walletTestCases) {
        it(`${creatorName} - ${tc.name}`, () => {
          const w = creator(tc);
          expect(w.getMnemonic()).to.equal(tc.wantMnemonic);
        });
      }
    }
  });

  describe('Public/Secret keys match vectors', () => {
    for (const [creatorName, creator] of Object.entries(walletCreators)) {
      for (const tc of walletTestCases) {
        it(`${creatorName} - PK - ${tc.name}`, () => {
          const w = creator(tc);
          const got = Buffer.from(w.getPK()).toString('hex');
          expect(got).to.equal(tc.wantPK);
        });
        it(`${creatorName} - SK - ${tc.name}`, () => {
          const w = creator(tc);
          const got = Buffer.from(w.getSK()).toString('hex');
          expect(got).to.equal(tc.wantSK);
        });
      }
    }
  });

  describe('Address(bytes) matches vectors', () => {
    for (const [creatorName, creator] of Object.entries(walletCreators)) {
      for (const tc of walletTestCases) {
        it(`${creatorName} - ${tc.name}`, () => {
          const w = creator(tc);
          const got = Buffer.from(w.getAddress()).toString('hex');
          expect(got).to.equal(tc.wantAddress.slice(1));
        });
      }
    }
  });

  describe('Address(string) matches vectors', () => {
    for (const [creatorName, creator] of Object.entries(walletCreators)) {
      for (const tc of walletTestCases) {
        it(`${creatorName} - ${tc.name}`, () => {
          const w = creator(tc);
          expect(w.getAddressStr()).to.equal(tc.wantAddress);
        });
      }
    }
  });

  describe('Sign matches vectors', () => {
    for (const [creatorName, creator] of Object.entries(walletCreators)) {
      for (const tc of walletTestCases) {
        it(`${creatorName} - ${tc.name}`, () => {
          const w = creator(tc);
          const msg = Buffer.from(tc.message, 'utf8');
          const sig = w.sign(msg);
          expect(Buffer.from(sig).toString('hex')).to.equal(tc.wantSignature);
        });
      }
    }
  });

  describe('Verify vectors', () => {
    for (const tc of walletTestCases) {
      it(`${tc.name}`, () => {
        const sig = Buffer.from(tc.wantSignature, 'hex');
        const pk = Buffer.from(tc.wantPK, 'hex');
        const msg = Buffer.from(tc.message, 'utf8');
        expect(Wallet.verify(sig, msg, pk)).to.equal(true);
      });
    }
  });

  describe('Sign & Verify', () => {
    const cases = [
      { name: 'ASCII', msg: Buffer.from('test message', 'utf8') },
      { name: 'Empty', msg: Buffer.alloc(0) },
      { name: 'Binary', msg: Uint8Array.from([1, 2, 3, 4, 5]) },
    ];

    for (const t of cases) {
      it(`newWallet - ${t.name}`, () => {
        const w = Wallet.newWallet();
        const sig = w.sign(t.msg);
        const pk = w.getPK();

        expect(Wallet.verify(sig, t.msg, pk)).to.equal(true);

        // tamper message
        if (t.msg.length > 0) {
          const tampered = new Uint8Array(t.msg);
          tampered[0] ^= 0x01;
          expect(Wallet.verify(sig, tampered, pk)).to.equal(false);
        }

        // tamper signature
        if (sig.length > 0) {
          const tampered = new Uint8Array(sig);
          tampered[0] ^= 0x01;
          expect(Wallet.verify(tampered, t.msg, pk)).to.equal(false);
        }
      });
    }
  });
});
