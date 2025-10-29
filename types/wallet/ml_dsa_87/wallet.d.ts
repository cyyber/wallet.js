export class Wallet {
    static newWallet(metadata?: number[]): Wallet;
    static newWalletFromSeed(seed: any, metadata?: number[]): Wallet;
    static newWalletFromExtendedSeed(extendedSeed: any): Wallet;
    static newWalletFromMnemonic(mnemonic: any): Wallet;
    constructor({ descriptor, seed, pk, sk }: {
        descriptor: any;
        seed: any;
        pk: any;
        sk: any;
    });
    descriptor: any;
    seed: any;
    pk: any;
    sk: any;
    /** @returns {Uint8Array} length 20 */
    getAddress(): Uint8Array;
    /** @returns {string} "Q" + hex */
    getAddressStr(): string;
    getDescriptor(): any;
    /** @returns {string} hex(Seed) */
    getHexSeed(): string;
    sign(message: any): Uint8Array;
}
//# sourceMappingURL=wallet.d.ts.map