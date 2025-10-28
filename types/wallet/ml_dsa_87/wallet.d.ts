export class Wallet {
    static NewWallet(metadata?: number[]): Wallet;
    static NewWalletFromSeed(seed: any, metadata?: number[]): Wallet;
    static NewWalletFromExtendedSeed(extendedSeed: any): Wallet;
    static NewWalletFromMnemonic(mnemonic: any): Wallet;
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
    extendedSeed: any;
    /** @returns {Uint8Array} length 20 */
    GetAddress(): Uint8Array;
    /** @returns {string} "Q" + hex */
    GetAddressStr(): string;
    GestDescriptor(): any;
    Sign(message: any): Uint8Array;
}
//# sourceMappingURL=wallet.d.ts.map