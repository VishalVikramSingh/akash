const cosmosjs = require("@cosmostation/cosmosjs");

const chainId = "akashnet-1";
const lcdUrl = "http://135.181.60.250:1317/";
const cosmos = cosmosjs.network(lcdUrl, chainId);

const mnemonic = ""; // my mnemonic
cosmos.setBech32MainPrefix("akash");
cosmos.setPath("m/44'/118'/0'/0/0");
const address = cosmos.getAddress(mnemonic);
const ecpairPriv = cosmos.getECPairPriv(mnemonic);

cosmos.getAccounts(address).then(data => {
	let stdSignMsg = cosmos.newStdMsg({
		msgs: [
			{
				type: "cosmos-sdk/MsgSend",
				value: {
					amount: [
						{
							amount: String(50000),
							denom: "uakt"
						}
					],
					from_address: address,
					to_address: "akash155svs6sgxe55rnvs6ghprtqu0mh69kehwgz2ee"
				}
			}
		],
		chain_id: chainId,
		fee: { amount: [ { amount: String(5000), denom: "uakt" } ], gas: String(200000) },
		memo: "",
		account_number: String(data.account.account_number),
		sequence: String(data.account.sequence)
	});
	const signedTx = cosmos.sign(stdSignMsg, ecpairPriv);
	cosmos.broadcast(signedTx).then(response => console.log(response));
})
