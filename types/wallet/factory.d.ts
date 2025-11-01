/**
 * Construct a wallet from an ExtendedSeed by auto-selecting the correct implementation.
 *
 * @param {ExtendedSeed|Uint8Array|string} extendedSeed - ExtendedSeed instance, 51 bytes or hex string.
 * @returns {QRLWallet} Wallet instance (ML-DSA-87 or SPHINCS+256s)
 */
export function newWalletFromExtendedSeed(extendedSeed: ExtendedSeed | Uint8Array | string): QRLWallet;
import { ExtendedSeed } from "./common/seed.js";
//# sourceMappingURL=factory.d.ts.map