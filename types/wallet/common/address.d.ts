/**
 *
 * @param {Uint8Array} pk
 * @param {Descriptor} descriptor
 */
export function getAddressFromPKAndDescriptor(pk: Uint8Array, descriptor: {
    new (bytes: number[] | Uint8Array): {
        _bytes: Uint8Array;
    };
}): any;
export function addressToString(addrBytes: any): string;
//# sourceMappingURL=address.d.ts.map