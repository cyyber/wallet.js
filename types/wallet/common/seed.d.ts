export type Descriptor = any;
export class Seed {
    /**
     * @param {string|Uint8Array|Buffer|number[]} input
     * @returns {Seed}
     */
    static from(input: string | Uint8Array | Buffer | number[]): Seed;
    /** @param {Uint8Array|number[]} bytes length 48 */
    constructor(bytes: Uint8Array | number[]);
    bytes: Uint8Array;
    /** @returns {Uint8Array} */
    hashSHA256(): Uint8Array;
    /** @returns {Uint8Array} */
    toBytes(): Uint8Array;
}
export class ExtendedSeed {
    /**
     *
     * @param {Descriptor} desc
     * @param {Seed} seed
     * @returns {ExtendedSeed}
     */
    static newExtendedSeed(desc: any, seed: Seed): ExtendedSeed;
    /**
     *
     * @param {string|Uint8Array|Buffer|number[]} input
     * @returns {ExtendedSeed}
     */
    static from(input: string | Uint8Array | Buffer | number[]): ExtendedSeed;
    constructor(bytes: any);
    bytes: Uint8Array;
    /** @returns {Uint8Array} */
    getDescriptorBytes(): Uint8Array;
    /** @returns {Uint8Array} */
    getSeedBytes(): Uint8Array;
    /** @returns {Seed} */
    getSeed(): Seed;
}
//# sourceMappingURL=seed.d.ts.map