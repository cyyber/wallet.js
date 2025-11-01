export type MLDSA87Type = import('./wallet/ml_dsa_87/wallet.js').Wallet;
export type SPHINCSPLUS256sType = import('./wallet/sphincsplus_256s/wallet.js').Wallet;
import { ExtendedSeed } from "./wallet/common/seed.js";
import { Descriptor } from "./wallet/common/descriptor.js";
import { DESCRIPTOR_SIZE } from "./wallet/common/constants.js";
import { newMLDSA87Descriptor } from "./wallet/ml_dsa_87/descriptor.js";
import { getAddressFromPKAndDescriptor } from "./wallet/common/address.js";
/**
 * Public Wallet namespace.
 * @type{{
 *  newWalletFromExtendedSeed(ext: string | Uint8Array | ExtendedSeed): any;
 *  MLDSA87: MLDSA87Type,
 *  SPHINCSPLUS256s: SPHINCSPLUS256sType,
 * }}
 */
export const Wallet: {
    newWalletFromExtendedSeed(ext: string | Uint8Array | ExtendedSeed): any;
    MLDSA87: MLDSA87Type;
    SPHINCSPLUS256s: SPHINCSPLUS256sType;
};
import { newWalletFromExtendedSeed } from "./wallet/factory.js";
import { Wallet as MLDSA87 } from "./wallet/ml_dsa_87/wallet.js";
import { Wallet as SPHINCSPLUS256s } from "./wallet/sphincsplus_256s/wallet.js";
export { ExtendedSeed, Descriptor, DESCRIPTOR_SIZE, newMLDSA87Descriptor, getAddressFromPKAndDescriptor };
//# sourceMappingURL=index.d.ts.map