export class Seed {
    /**
     *
     * @param {string|Uint8Array|Buffer|number[]} input
     * @returns {Seed}
     */
    static from(input: string | Uint8Array | Buffer | number[]): Seed;
    /** @param {Uint8Array|number[]} bytes length 48 */
    constructor(bytes: Uint8Array | number[]);
    bytes: Uint8Array;
    hashSHA256(): Uint8Array;
    /** @returns {Uint8Array} */
    toBytes(): Uint8Array;
}
//# sourceMappingURL=seed.d.ts.map