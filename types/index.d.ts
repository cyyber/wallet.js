import { ExtendedSeed } from "./wallet/common/seed.js";
import { Descriptor } from "./wallet/common/descriptor.js";
import { DESCRIPTOR_SIZE } from "./wallet/common/constants.js";
import { newMLDSA87Descriptor } from "./wallet/ml_dsa_87/descriptor.js";
import { getAddressFromPKAndDescriptor } from "./wallet/common/address.js";
import { WalletType } from "./wallet/common/wallettype.js";
import { newWalletFromExtendedSeed } from "./wallet/factory.js";
import { Wallet as MLDSA87 } from "./wallet/ml_dsa_87/wallet.js";
export declare namespace Wallet {
    export { newWalletFromExtendedSeed };
    export { MLDSA87 };
}
export { ExtendedSeed, Descriptor, DESCRIPTOR_SIZE, newMLDSA87Descriptor, getAddressFromPKAndDescriptor, WalletType };
//# sourceMappingURL=index.d.ts.map