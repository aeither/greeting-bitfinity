import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { defineChain } from "viem";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import App from "./App";
import "./index.scss";

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

const config = getDefaultConfig({
	appName: "My RainbowKit App",
	projectId: "YOUR_PROJECT_ID",
	chains: [sepolia, bitfinityTestnet],
	ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider>
					<App />
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	</React.StrictMode>,
);
