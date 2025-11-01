import { ExtendedSeed } from "./wallet/common/seed.js";
import { Descriptor } from "./wallet/common/descriptor.js";
import { DESCRIPTOR_SIZE } from "./wallet/common/constants.js";
import { newMLDSA87Descriptor } from "./wallet/ml_dsa_87/descriptor.js";
import { getAddressFromPKAndDescriptor } from "./wallet/common/address.js";
export namespace Wallet {
    export { newWalletFromExtendedSeed };
    export let MLDSA87: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
    export let SPHICSPLUS256s: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
}
import { newWalletFromExtendedSeed } from "./wallet/factory.js";
export { ExtendedSeed, Descriptor, DESCRIPTOR_SIZE, newMLDSA87Descriptor, getAddressFromPKAndDescriptor };
//# sourceMappingURL=index.d.ts.map