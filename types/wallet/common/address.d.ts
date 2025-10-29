export type Descriptor = any;
/**
 *
 * @param {Uint8Array} pk
 * @param {Uint8Array} descriptorBytes
 * @returns {Uint8Array} address
 */
export function unsafeGetAddress(pk: Uint8Array, descriptorBytes: Uint8Array): Uint8Array;
export function addressToString(addrBytes: any): string;
/**
 *
 * @param {Uint8Array} pk
 * @param {Descriptor} descriptor
 */
export function getAddressFromPKAndDescriptor(pk: Uint8Array, descriptor: any): Uint8Array;
//# sourceMappingURL=address.d.ts.map