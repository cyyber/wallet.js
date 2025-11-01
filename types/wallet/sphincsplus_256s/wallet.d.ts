export class Wallet {
    /** @returns {Uint8Array} */ getAddress(): Uint8Array;
    /** @returns {string} */ getAddressStr(): string;
    /** @returns {Uint8Array} */ getPK(): Uint8Array;
    /** @returns {Uint8Array} */ getSK(): Uint8Array;
    /** @param {Uint8Array} message @returns {Uint8Array} */ sign(): Uint8Array;
    /** @param {ExtendedSeed} @returns {Uint8Array} */ newWalletFromHexSeed(): Uint8Array;
}
//# sourceMappingURL=wallet.d.ts.map