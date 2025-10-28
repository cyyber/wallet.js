export class Descriptor {
    /** @param {Uint8Array|number[]} bytes length 3 */
    constructor(bytes: Uint8Array | number[]);
    bytes: Uint8Array;
    /** @returns {Uint8Array} */
    toBytes(): Uint8Array;
}
/**
 * @param {number} WalletType
 * @param {[number, number]} metadata
 * @returns {Uint8Array} length 3
 */
export function getDescriptorBytes(walletType: any, metadata?: [number, number]): Uint8Array;
//# sourceMappingURL=descriptor.d.ts.map