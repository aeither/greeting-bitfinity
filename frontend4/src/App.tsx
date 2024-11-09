import { useAccount, useConnect, useDisconnect, useWriteContract } from "wagmi";
import CONTRACT_ABI from "./abi/Wagmi";

// const CONTRACT_ADDRESS = "0x95fB17070fc3278Cd754f808E035868EbBBB1A64"; // sepolia
const CONTRACT_ADDRESS = "0x56C66e07f669A04C21Fb376Ead3eFbAE4f9440AC"; // bitfinity

function App() {
	const account = useAccount();
	const { connectors, connect, status, error } = useConnect();
	const { disconnect } = useDisconnect();
	const { data: hash, writeContract } = useWriteContract({
		mutation: {
			onSuccess: (data) => {
				console.log("on success", data);
			},
		},
	});

	const doSomething = async () => {
		writeContract({
			address: CONTRACT_ADDRESS,
			abi: CONTRACT_ABI,
			functionName: "greet",
			args: ["hello"],
		});
	};

	return (
		<>
			<div>
				<button type="button" onClick={doSomething}>
					This
				</button>
				<h2>Account</h2>

				<div>
					status: {account.status}
					<br />
					addresses: {JSON.stringify(account.addresses)}
					<br />
					chainId: {account.chainId}
				</div>

				{account.status === "connected" && (
					<button type="button" onClick={() => disconnect()}>
						Disconnect
					</button>
				)}
			</div>

			<div>
				<h2>Connect</h2>
				{connectors.map((connector) => (
					<button
						key={connector.uid}
						onClick={() => connect({ connector })}
						type="button"
					>
						{connector.name}
					</button>
				))}
				<div>{status}</div>
				<div>{error?.message}</div>
			</div>
		</>
	);
}

export default App;
