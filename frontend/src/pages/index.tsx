import { useEffect, useState } from "react";
import { parseAbi } from "viem";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import { NetworkSwitcher } from "@/components/SwitchNetworks";
import { WalletModal } from "@/components/WalletModal";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useWagmiContractAddress } from "@/hooks";

const abi = parseAbi([
	"function greet(string name) public returns (string)",
	"function getSubmittedNames() public view returns (string[])",
	"function getSubmittedNamesCount() public view returns (uint256)",
	"event NewGreeting(string name, string greeting)",
]);

function Home() {
	const { address } = useAccount();
	const { toast } = useToast();
	const [show, setShow] = useState(false);
	const [name, setName] = useState("");
	const contractAddress = useWagmiContractAddress() as `0x${string}`;

	useEffect(() => {
		console.log("Contract Address:", contractAddress);
	}, [contractAddress]);

	const { data: submittedNames, refetch: refetchNames } = useReadContract({
		address: contractAddress,
		abi,
		functionName: "getSubmittedNames",
	});

	const { data: nameCount, refetch: refetchCount } = useReadContract({
		address: contractAddress,
		abi,
		functionName: "getSubmittedNamesCount",
	});

	useEffect(() => {
		console.log("Submitted Names:", submittedNames);
		console.log("Name Count:", nameCount?.toString());
	}, [submittedNames, nameCount]);

	const { writeContract, data: hash, error: writeError } = useWriteContract();

	const { isLoading: isConfirming, isSuccess: isConfirmed } =
		useWaitForTransactionReceipt({
			hash,
		});

	useEffect(() => {
		if (hash) console.log("Transaction Hash:", hash);
		if (writeError) console.error("Write Error:", writeError);
		if (isConfirmed) {
			console.log("Transaction Confirmed!");
			refetchNames();
			refetchCount();
			setName("");
			toast({
				title: "Success",
				description: "Greeting submitted successfully!",
			});
		}
	}, [hash, writeError, isConfirmed, refetchNames, refetchCount, toast]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Submitting name:", name);

		if (!name) {
			toast({
				title: "Error",
				description: "Please enter a name",
				variant: "destructive",
			});
			return;
		}

		if (!address) {
			toast({
				title: "Error",
				description: "Please connect your wallet",
				variant: "destructive",
			});
			return;
		}

		try {
			const tx = await writeContract({
				address: contractAddress,
				abi,
				functionName: "greet",
				args: [name],
			});
			console.log("Transaction initiated:", tx);
		} catch (error) {
			console.error("Submit Error:", error);
			toast({
				title: "Error",
				description: "Failed to submit greeting",
				variant: "destructive",
			});
		}
	};

	const toggleModal = (e: boolean) => {
		setShow(e);
	};

	const Action = () => (
		<>
			<NetworkSwitcher />
			<WalletModal
				open={show}
				onOpenChange={toggleModal}
				close={() => setShow(false)}
			>
				{({ isLoading }) => (
					<Button className="mr-4 flex items-center">
						{isLoading && (
							<span className="i-line-md:loading-twotone-loop mr-1 h-4 w-4 inline-flex text-white" />
						)}
						{address
							? `${address.slice(0, 6)}...${address.slice(-4)}`
							: "Connect Wallet"}
					</Button>
				)}
			</WalletModal>
		</>
	);

	return (
		<>
			<Header action={<Action />} />
			<div className="relative m-auto max-w-6xl min-h-[calc(100vh-8rem)] flex-col-center justify-start pt-16">
				<h1 className="text-4xl font-bold mb-8">Greeting dApp</h1>

				<Card className="w-[400px] mb-8">
					<CardHeader>
						<CardTitle>Submit a Greeting</CardTitle>
						<CardDescription>
							Enter your name to receive a greeting
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="flex flex-col gap-4">
							<Input
								placeholder="Enter your name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								disabled={!address || isConfirming}
							/>
							<Button type="submit" disabled={!address || isConfirming}>
								{isConfirming ? "Confirming..." : "Submit Greeting"}
							</Button>
						</form>
					</CardContent>
				</Card>

				<Card className="w-[400px]">
					<CardHeader>
						<CardTitle>Submitted Names</CardTitle>
						<CardDescription>
							Total submissions: {nameCount?.toString() || "0"}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col gap-2">
							{submittedNames?.map((name, index) => (
								<div key={index as number} className="p-2 bg-secondary rounded">
									{name}
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="border-t-1 border-border border-solid">
				<div className="mx-auto max-w-6xl py-6 text-center lt-sm:px-4 sm:px-8">
					© 2024 Greeting dApp
				</div>
			</div>
		</>
	);
}

export default Home;