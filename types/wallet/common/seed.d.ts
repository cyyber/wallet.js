export class Seed {
    /** @param {string} hexSr */
    static HexStrToSeed(hexStr: any): void;
    /** @param {Uint8Array|number[]} bytes length 48 */
    constructor(bytes: Uint8Array | number[]);
    _bytes: Uint8Array;
    HashSHA256(): Uint8Array;
}
//# sourceMappingURL=seed.d.ts.map