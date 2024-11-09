import { sepolia } from "viem/chains";
import { createConfig, http } from "wagmi";
import { walletConnect } from "wagmi/connectors";
import { bitfinityTestnet } from "./hooks";

export const wagmiConfig = createConfig({
	chains: [bitfinityTestnet],
	transports: {
		[bitfinityTestnet.id]: http(),
		[sepolia.id]: http(),
	},
	connectors: [
		walletConnect({
			projectId: "f18c88f1b8f4a066d3b705c6b13b71a8",
		}),
	],
});
