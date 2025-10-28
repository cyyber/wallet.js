const { SEED_SIZE } = require('./constants');
const { sha256 } = require('@noble/hashes/sha2.js');

class Seed {
    /** @param {Uint8Array|number[]} bytes length 48 */
    constructor(bytes) {
        if (!bytes || bytes.length !== SEED_SIZE) {
            throw new Error(`Seed must be ${SEED_SIZE} bytes`);
        }
        this._bytes = Uint8Array.from(bytes);
    }

    HashSHA256() { return Uint8Array.from(sha256(this._bytes)); }

    /** @param {string} hexSr */
    static HexStrToSeed(hexStr) {
        const clean = hexStr.startsWith('0x') ? hexStr.slice(2) : hexStr;
        if (clean.length !== SEED_SIZE * 2) {
            throw new Error(`hex seed must be ${SEED_SIZE * 2} hex chars`)
        }
    }
}

module.exports = { 
    Seed: Seed,
};