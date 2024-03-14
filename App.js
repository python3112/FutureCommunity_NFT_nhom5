import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { ShyftSdk, ShyftWallet, Network, signAndSendTransactionWithPrivateKeys } from '@shyft-to/js';
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Transaction,
  VersionedTransaction,
  Keypair,
  SystemProgram,
  LAMPORTS_PER_SOL
} from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { decode } from 'bs58';
import { Buffer } from 'buffer';



const App = () => {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState('');
  const [wallet, setWallet] = useState(null);
  const privateKeys = "4BDHbHK8Nf1cyKuvY7Yi5V2oz5ijhEoR5M1PA2LJUXfkj1JwQ56ekSBxHxztw1KmukKCE7kK8qYUrVBbd7VyrccQ";
  const network = Network.Devnet;
  const xAPIKey = "M1S8rBLftYC6xhMu";
  const shyft = new ShyftSdk({ apiKey: 'M1S8rBLftYC6xhMu', network: Network.Devnet });
  useEffect(() => {
  }, [])

  const connect = () => {
    const shyft = new ShyftSdk({ apiKey: 'M1S8rBLftYC6xhMu', network: Network.Devnet });
    (async () => {
      try {
        const balance = await shyft.wallet.getBalance({ wallet: 'V7ZEdjPdr1PHmCmtKHGMM1EkjZC4jLn2n9wM9aDwdAp' });
        const history = await shyft.wallet.transactionHistory({ network: network, wallet: "V7ZEdjPdr1PHmCmtKHGMM1EkjZC4jLn2n9wM9aDwdAp" })
        const send = await shyft.wallet.sendSol({ network: "devnet", fromAddress: 'V7ZEdjPdr1PHmCmtKHGMM1EkjZC4jLn2n9wM9aDwdAp', toAddress: "NmyYP3c2vW2vBPZjgE1bFy5cVQxWiXJhVdQwkWtXUfm", amount: 2 })
        setWallet(send);
        // Get using Shyft API

      } catch (error) {
        console.log(error);
      }

    })();
  }

  async function processTransaction() {
    try {
      const encodedTransaction = await shyft.wallet.sendSol({ network: "devnet", fromAddress: 'V7ZEdjPdr1PHmCmtKHGMM1EkjZC4jLn2n9wM9aDwdAp', toAddress: "NmyYP3c2vW2vBPZjgE1bFy5cVQxWiXJhVdQwkWtXUfm", amount: 2 })
      const pk = getRawTransaction(encodedTransaction)
      console.log(pk)
      const txnSignature = await signAndSendTransactionWithPrivateKeys(
        network,
        encodedTransaction,
        pk
      );
  
      console.log(txnSignature);
    } catch (error) {
      console.log(error)
      throw new Error(error);
    }
  }


  function getRawTransaction(encodedTransaction) {
    let recoveredTransaction
    try {
      recoveredTransaction = Transaction.from(Buffer.from(encodedTransaction, 'base64'));
    } catch (error) {
      recoveredTransaction = VersionedTransaction.deserialize(Buffer.from(encodedTransaction, 'base64'));
    }
    console.log(recoveredTransaction)
    return recoveredTransaction;
  }

  const signTransaction = async (fromPrivateKey) => {
    try {

      const connect = new Connection(clusterApiUrl('devnet'), 'confirmed');
      const feePayer = Keypair.fromSecretKey(decode(fromPrivateKey));
      console.log(feePayer);
      const recoveredTransaction = getRawTransaction(send);

      if (recoveredTransaction.verifySignatures()) {
        recoveredTransaction.sign(['V7ZEdjPdr1PHmCmtKHGMM1EkjZC4jLn2n9wM9aDwdAp'])
      } else {
        recoveredTransaction.partialSign('V7ZEdjPdr1PHmCmtKHGMM1EkjZC4jLn2n9wM9aDwdAp');
      }


      const txnSignature = await connect.sendRawTransaction(recoveredTransaction.serialize());
      console.log(txnSignature)
    } catch (error) {
      console.log(error);
    }
  }







  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <View>
        <Text>Connected to Phantom Wallet</Text>
        <Text>Public Key: {publicKey}</Text>
        <Button title="Disconnect" onPress={() =>processTransaction() } />
      </View>

    </View>



  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default App;