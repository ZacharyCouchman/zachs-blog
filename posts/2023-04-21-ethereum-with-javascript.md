---
layout: single
title: Interacting with the Ethereum blockchain using JavaScript
date: 2023-04-21
tags:
---
This article is aimed at developers looking to get started in blockchain development with Ethereum. It assumes that you have some basic knowledge of the Ethereum blockchain, what a wallet is, what gas fees are and that you have set up a test MetaMask wallet. The focus here is on using ethers.js to read and write data on the blockchain.
[ethers.js](https://docs.ethers.org/v5/) is a library which makes it easy to interact with Ethereum and other EVM compatible blockchains.

### What to expect

This article covers several examples for interacting with the Ethereum blockchain including:
1. Reading the ETH balance of an account.
2. Reading an ERC20 token ($IMX) balance of an account.
3. Sending a transaction (sending ETH) from one account to another.
4. Querying events emitted on the blockchain.
5. Inspecting the information in specific blocks.
I have published a code repository which contains several examples here. Feel free to clone it to get started: [Interacting with Ethereum with JavaScript Demo](https://github.com/ZacharyCouchman/ethereum-with-javascript-demo)

---

### Introduction

It is common for web applications in the Ethereum ecosystem (dapps) to make requests to Ethereum clients for reading data, transferring value between wallets and interacting with smart contracts. Commonly, these web applications make use of a **provider** which has been injected into the browser by a wallet application. A **provider** in this context is a JavaScript object that conforms to the [EIP-1193 standard](https://eips.ethereum.org/EIPS/eip-1193). It is used for sending RPC requests to Ethereum clients and receiving their responses. The following examples are Node.js scripts which make use of their own **provider** objects created with the ethers.js library.

---

### Reading Balances

The first basic example shows how you can read the ETH balance of a wallet address. As this is a read-only transaction, we can just create a provider object and call the *getBalance()* method. This request does not update the state of the blockchain and so does not require the user to pay a gas fee.

```typescript
import { ethers } from "ethers"
import { formatEther } from "ethers/lib/utils.js";

const walletAddress = ""; // add the wallet address you want to check the balance of

const rpcUrl = "https://eth-mainnet.g.alchemy.com/v2/demo";

async function getWalletBalance(){
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const balance = await provider.getBalance(walletAddress);

  console.log(`ETH balance of ${walletAddress} is ${formatEther(balance)}`)
}

getWalletBalance();
```

---

### Reading ERC20 Token Balances

The next example shows how you can read the ERC20 token balance of a wallet. An ERC20 token is a fungible token which is controlled by a smart contract. This keeps track of the total supply of the ERC20 tokens, the name, symbol of the currency and more importantly, the balance of all accounts which hold the token.
In order to read the ERC20 token balance of a wallet, we need to make a connection to the smart contract and call the *balanceOf()* function.
In this example we will use the Immutable X ERC20 contract to check the balance of a wallet. In order to connect to a smart contract, you will need to know the contract address, the interface of the contract (called an ABI) and a provider object. Again, as this is a read-only request, you will not have to pay a gas fee.

```typescript
import { ethers } from "ethers";
import { formatUnits } from "ethers/lib/utils.js";

const walletAddress = ""; // add the wallet address you want to check the balance of
const rpcUrl = "https://eth-mainnet.g.alchemy.com/v2/demo";
const imxERC20TokenAddress = "0xF57e7e7C23978C3cAEC3C3548E3D615c346e79fF"; // Immutable X ERC20 token contract address

const contractABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address account) view returns (uint256)"
];

async function getERC20Balance(){
  
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

  const imxTokenContract = new ethers.Contract(imxERC20TokenAddress, contractABI, provider);
  
  const nameOfIMXToken = await imxTokenContract.name();
  const symbolOfIMXToken = await imxTokenContract.symbol();
  const decimalsOfIMXToken = await imxTokenContract.decimals();
  const balance = await imxTokenContract.balanceOf(walletAddress);

  console.log(`The name of ERC20 token is ${nameOfIMXToken} and it's symbol is ${symbolOfIMXToken}.`)
  console.log(`The currency has ${decimalsOfIMXToken} decimals.`)
  console.log(`The IMX token balance of ${walletAddress} is ${formatUnits(balance, decimalsOfIMXToken)}`)
}

getERC20Balance();
```

---

### Sending a transaction

The Ethereum network allows its users to send and receive ETH in a peer to peer fashion. As long as I know your wallet address, I can send you some of my Ether. This is a simple transaction and as this changes the state of the blockchain (your balance goes up and mine goes down), it will require a gas fee to process the transaction.
MetaMask is one of the most popular wallet applications and makes sending funds easy. However, if you want to do this programmatically, this is a way in which you can achieve that.
This example requires the private key of the account that is sending the funds as it is required to authorise the transaction. It's very important to keep this private key secret as anyone that has it will be able to submit transactions from the account. If you are using this example, create a test wallet in MetaMask to use and never put any ETH into this wallet.
In this example we connect to the Goerli test net (a test network version of Ethereum) and send a transaction using Goerli ETH. If you don't have Goerli ETH in your wallet you can request some from here: https://goerlifaucet.com/

```typescript
import { ethers } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils.js";

// As this demo is for sending funds, connect to the goerli test network to not spend real money
const rpcUrl = "https://eth-goerli.g.alchemy.com/v2/demo";

const wallet1PublicAddress = ""; // add the wallet address you want to send goerli ETH from
const wallet1PrivateKey = ""; // Do not expose this Private key. Only use a test wallet for this demo.
const wallet2PublicAddress = ""; // add the wallet address you want to send funds to

async function sendATransaction() {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(wallet1PrivateKey, provider);
  const wallet1Balance = await provider.getBalance(wallet1PublicAddress);
  const wallet2Balance = await provider.getBalance(wallet2PublicAddress);

  console.log(`Wallet 1 balance before transaction: ${formatEther(wallet1Balance)}`);
  console.log(`Wallet 2 balance before transaction: ${formatEther(wallet2Balance)}`);

  const txRequest = {
    to: wallet2PublicAddress,
    value: parseEther("0.001"),
  }

  const txResponse = await wallet.sendTransaction(txRequest);

  console.log("Transaction response is:")
  console.log(txResponse);

  console.log("Waiting for transaction to be confirmed.");
  console.log(`You can check the status of this transaction on Etherscan at https://goerli.etherscan.io/tx/${txResponse.hash}`);
  const txReceipt = await provider.waitForTransaction(txResponse.hash);

  const wallet1BalanceAfter = await provider.getBalance(wallet1PublicAddress);
  const wallet2BalanceAfter = await provider.getBalance(wallet2PublicAddress);
  console.log(`Wallet 1 balance after transaction: ${formatEther(wallet1BalanceAfter)}`);
  console.log(`Wallet 2 balance after transaction: ${formatEther(wallet2BalanceAfter)}`);
}

sendATransaction();
```

---

### Querying events on the blockchain

There are many other things that you can do with the blockchain, one of which is query the state of the blockchain to see what has happened. We can check which addresses sent funds to which other addresses and a heap of other transactions with smart contracts. When events like this occur, the smart contract will emit an event which can be queried and read.
This next example shows how to query those events. Again we look at the Immutable X ERC20 token contract for transactions that have been made. By applying different filters we can narrow down the results to the events that we are looking for.

```typescript
import { ethers } from 'ethers';
import { formatUnits } from 'ethers/lib/utils.js';

const rpcUrl = `https://eth-mainnet.g.alchemy.com/v2/demo`;

const imxERC20TokenAddress = "0xF57e7e7C23978C3cAEC3C3548E3D615c346e79fF";

const contractABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address account) view returns (uint256)",
  "event Transfer(address indexed from, address indexed to, uint256 value)"
];

async function queryEvents() {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

  const contract = new ethers.Contract(imxERC20TokenAddress, contractABI, provider);

  const filter = contract.filters.Transfer();
  // query all IMX transfer events in the last 200 blocks
  const events = await contract.queryFilter(filter, provider.blockNumber - 200, provider.blockNumber);

  const logTransfer = (event) => console.log(`${event.args.from} transferred ${formatUnits(event.args.value, 18)} IMX to ${event.args.to}`);
  events.forEach(logTransfer);
}

queryEvents();
```

---

### Inspect information in a block

The last example that we will go through is another read request. Using the provider we can query any block in the blockchain and inspect the transactions and other information contained within it.

```typescript
import { ethers } from "ethers"

const rpcUrl = `https://eth-mainnet.g.alchemy.com/v2/demo`;

async function inspectBlocks(){
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

  const blockNumber = await provider.getBlockNumber();
  console.log(blockNumber);
  const previousBlock = await provider.getBlock(blockNumber - 1);
  console.log(`Getting previous block: ${blockNumber - 1}`)
  console.log(previousBlock);
  const latestBlock = await provider.getBlock(blockNumber);
  console.log(`Getting latest block: ${blockNumber}`)
  console.log(latestBlock);

  console.log(`Previous block's hash ${previousBlock.hash} is the parent hash of the latest block ${latestBlock.parentHash}`)

  const getBlockWithTransactions = await provider.getBlockWithTransactions(blockNumber);
  console.log('First transaction in the latest block:')
  console.log(getBlockWithTransactions.transactions[0]);

}

inspectBlocks();
```

---

### Conclusion

With these basic examples you should be able to get started creating your own application or explore the activity of the Ethereum blockchain. Good luck!