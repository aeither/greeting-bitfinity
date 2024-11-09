export default [
	{
		type: "function",
		name: "getSubmittedNames",
		inputs: [],
		outputs: [{ name: "", type: "string[]", internalType: "string[]" }],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "getSubmittedNamesCount",
		inputs: [],
		outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "greet",
		inputs: [{ name: "name", type: "string", internalType: "string" }],
		outputs: [{ name: "", type: "string", internalType: "string" }],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "submittedNames",
		inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
		outputs: [{ name: "", type: "string", internalType: "string" }],
		stateMutability: "view",
	},
	{
		type: "event",
		name: "NewGreeting",
		inputs: [
			{
				name: "name",
				type: "string",
				indexed: false,
				internalType: "string",
			},
			{
				name: "greeting",
				type: "string",
				indexed: false,
				internalType: "string",
			},
		],
		anonymous: false,
	},
] as const;
