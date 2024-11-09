import { defineChain } from "viem";
import { useAccount } from "wagmi";

import WAGMI_ABI from "./abi/Wagmi";

// Define Bitfinity Testnet chain using viem's defineChain
export const bitfinityTestnet = defineChain({
	id: 355113,
	name: "Bitfinity Testnet",
	network: "bitfinity-testnet",
	nativeCurrency: {
		decimals: 18,
		name: "BTF",
		symbol: "BTF",
	},
	rpcUrls: {
		default: { http: ["https://testnet.bitfinity.network"] },
		public: { http: ["https://testnet.bitfinity.network"] },
	},
	blockExplorers: {
		default: {
			name: "BitfinityExplorer",
			url: "https://explorer.bitfinity.network",
		},
	},
	contracts: {
		// Add any default contracts if needed
	},
	testnet: true,
});

export function useWagmiContract() {
	const address = useWagmiContractAddress();
	return useMemo(
		() => ({
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			address: address! as `0x${string}`,
			abi: WAGMI_ABI,
		}),
		[address],
	);
}

export function useWagmiContractAddress() {
	const { chain = bitfinityTestnet } = useAccount();

	return useMemo(
		() =>
			({
				[bitfinityTestnet.id]: "0x56C66e07f669A04C21Fb376Ead3eFbAE4f9440AC",
			})[chain.id],
		[chain],
	);
}