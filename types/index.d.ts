import { ExtendedSeed } from "./wallet/common/seed.js";
import { Descriptor } from "./wallet/common/descriptor.js";
import { DESCRIPTOR_SIZE } from "./wallet/common/constants.js";
import { newMLDSA87Descriptor } from "./wallet/ml_dsa_87/descriptor.js";
import { getAddressFromPKAndDescriptor } from "./wallet/common/address.js";
import { newWalletFromExtendedSeedAuto } from "./wallet/factory.js";
export declare namespace Wallet {
    export { newWalletFromExtendedSeedAuto };
}
export { ExtendedSeed, Descriptor, DESCRIPTOR_SIZE, newMLDSA87Descriptor, getAddressFromPKAndDescriptor };
//# sourceMappingURL=index.d.ts.map