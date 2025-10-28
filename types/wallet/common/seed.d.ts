export class Seed {
    /** @param {string} hexSr */
    static hexStrToSeed(hexStr: any): void;
    /** @param {Uint8Array|number[]} bytes length 48 */
    constructor(bytes: Uint8Array | number[]);
    _bytes: Uint8Array;
    hashSHA256(): Uint8Array;
}
//# sourceMappingURL=seed.d.ts.map