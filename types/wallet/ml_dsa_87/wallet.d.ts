export type Descriptor = import('../common/descriptor.js').Descriptor;
export class Wallet {
    static newWallet(metadata?: number[]): Wallet;
    static newWalletFromSeed(seed: any, metadata?: number[]): Wallet;
    static newWalletFromExtendedSeed(extendedSeed: any): Wallet;
    static newWalletFromMnemonic(mnemonic: any): Wallet;
    static verify(signature: any, message: any, pk: any): boolean;
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
    extendedSeed: ExtendedSeed;
    /** @returns {Uint8Array} length 20 */
    getAddress(): Uint8Array;
    /** @returns {string} "Q" + hex */
    getAddressStr(): string;
    /** @returns {Descriptor} */
    getDescriptor(): Descriptor;
    /** @returns {ExtendedSeed} */
    getExtendedSeed(): ExtendedSeed;
    /** @returns {Seed} */
    getSeed(): Seed;
    /** @returns {string} hex(Seed) */
    getHexSeed(): string;
    /** @returns {Uint8Array} */
    getPK(): Uint8Array;
    /** @returns {Uint8Array} */
    getSK(): Uint8Array;
    sign(message: any): Uint8Array;
}
import { ExtendedSeed } from "../common/seed.js";
import { Seed } from "../common/seed.js";
//# sourceMappingURL=wallet.d.ts.map