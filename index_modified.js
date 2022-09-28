// Import Solana web3 functionality
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

// Connect to Devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const input_address = process.argv.slice(2)[0].toString();

console.log("Public Key provided by user", input_address);

// Get the wallet balance from a given private key
const getWalletBalance = async () => {
    try {
        // Connect to Devnet
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
//        console.log("Connection object is:", connection);

        const walletBalance = await connection.getBalance(
            new PublicKey(input_address)
        );
        console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.log(err);
    }
};

const airDropSol = async () => {
    try {
        // Connect to Devnet and make a wallet from privateKey
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

        // Request airdrop of 2 SOL to the wallet
        console.log("Airdropping some SOL to wallet", input_address, "!");
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(input_address),
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};

// Show the wallet balance before and after airdropping SOL
const mainFunction = async () => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

mainFunction();