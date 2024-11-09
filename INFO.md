Deploy to Bitfinity Testnet

```bash
source .env && rm -rf cache out && forge build && forge script --chain 355113 script/Greeting.s.sol:DeployScript --rpc-url https://testnet.bitfinity.network --broadcast -vvvv --private-key ${PRIVATE_KEY}
```

interact

```bash
source .env && cast send 0x56C66e07f669A04C21Fb376Ead3eFbAE4f9440AC \
"greet(string)" "Alice" \
--rpc-url https://testnet.bitfinity.network \
--private-key ${PRIVATE_KEY}
```

```bash
cast call 0x56C66e07f669A04C21Fb376Ead3eFbAE4f9440AC \
"getSubmittedNames()" \
--rpc-url  https://testnet.bitfinity.network
```

## CD

```bash
cd frontend2/src/frontend2_frontend
```