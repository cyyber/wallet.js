import { ExtendedSeed } from "./wallet/common/seed.js";
import { Descriptor } from "./wallet/common/descriptor.js";
import { DESCRIPTOR_SIZE } from "./wallet/common/constants.js";
import { newMLDSA87Descriptor } from "./wallet/ml_dsa_87/descriptor.js";
import { getAddressFromPKAndDescriptor } from "./wallet/common/address.js";
import { Wallet as MLDSA87 } from "./wallet/ml_dsa_87/wallet.js";
export namespace Wallet {
    export { newWalletFromExtendedSeed };
}
import { newWalletFromExtendedSeed } from "./wallet/factory.js";
export { ExtendedSeed, Descriptor, DESCRIPTOR_SIZE, newMLDSA87Descriptor, getAddressFromPKAndDescriptor, MLDSA87 };
//# sourceMappingURL=index.d.ts.map