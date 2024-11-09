import { useAccount, useReadContracts } from "wagmi";

import { useWagmiContract } from "./use-contract";

export function useWagmi() {
	const { address } = useAccount();
	const wagmiContract = useWagmiContract();

	const { data } = useReadContracts({
		contracts: [
			{
				...wagmiContract,
				functionName: "getSubmittedNames",
			},
			{
				...wagmiContract,
				functionName: "getSubmittedNamesCount",
			},
			{
				...wagmiContract,
				functionName: "greet",
			},
			{
				...wagmiContract,
				functionName: "submittedNames",
			},
		],
	});

	return {
		getBoredom: data?.[1]?.toString() ?? undefined,
		getAlive: data?.[2]?.toString() ?? undefined,
		loved: data?.[3]?.toString() ?? undefined,
		status: data?.[0]?.toString() ?? undefined,
	};
}
