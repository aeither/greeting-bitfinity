import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import {
	useAccount,
	useEnsName,
	useReadContract,
	useWriteContract
} from "wagmi";
import CONTRACT_ABI from "./abi/Wagmi";

const CONTRACT_ADDRESS = "0x95fB17070fc3278Cd754f808E035868EbBBB1A64"; // sepolia
// const CONTRACT_ADDRESS = "0x56C66e07f669A04C21Fb376Ead3eFbAE4f9440AC"; // bitfinity

function App() {
	const { address } = useAccount();
	const {
		data: ensData,
		error: ensError,
		status: ensStatus,
	} = useEnsName({ address });
	const [name, setName] = useState("");
	const [greetingResult, setGreetingResult] = useState("");

	// Read submitted names count
	const { data: namesCount } = useReadContract({
		address: CONTRACT_ADDRESS,
		abi: CONTRACT_ABI,
		functionName: "getSubmittedNamesCount",
	});

	// Read submitted names
	const { data: submittedNames } = useReadContract({
		address: CONTRACT_ADDRESS,
		abi: CONTRACT_ABI,
		functionName: "getSubmittedNames",
	});

	// Write greeting
	const { write: greet } = useWriteContract({
		address: CONTRACT_ADDRESS,
		abi: CONTRACT_ABI,
		functionName: "greet",
		args: [name],
		onSuccess(data) {
			data.wait().then((receipt) => {
				const greeting = receipt.events.args.greeting;
				setGreetingResult(greeting);
			});
		},
	});

	return (
		<div className="p-4">
			<ConnectButton />

			<div className="mt-4">
				{!address ? (
					<p>Connect your wallet to view ENS name</p>
				) : ensStatus === "pending" ? (
					<div>Loading ENS name...</div>
				) : ensStatus === "error" ? (
					<div>Error fetching ENS name: {ensError.message}</div>
				) : (
					<div>ENS name: {ensData || "No ENS name found"}</div>
				)}
			</div>

			<div className="mt-4">
				<h2>Submit a Greeting</h2>
				<input
					type="text"
					placeholder="Enter your name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<button type="button" onClick={() => greet()}>
					Greet
				</button>
				{greetingResult && <div>{greetingResult}</div>}
				<h3>Submitted Names Count: {namesCount || 0}</h3>
				<h3>Submitted Names:</h3>
				<ul>
					{submittedNames?.map((name, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<li key={index}>{name}</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default App;
