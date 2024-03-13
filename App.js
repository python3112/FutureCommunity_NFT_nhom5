import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { ShyftSdk, ShyftWallet, Network, signAndSendTransactionWithPrivateKeys } from '@shyft-to/js';
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import * as web3 from '@solana/web3.js';



const App = () => {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState('');
  const [wallet, setWallet] = useState(null);
  const privateKeys = "4BDHbHK8Nf1cyKuvY7Yi5V2oz5ijhEoR5M1PA2LJUXfkj1JwQ56ekSBxHxztw1KmukKCE7kK8qYUrVBbd7VyrccQ";
  const network = Network.Devnet;
  const xAPIKey = "M1S8rBLftYC6xhMu";
  useEffect(() => {
 
checkPhantom();


  }, [])

  const connect = () => {
    const shyft = new ShyftSdk({ apiKey: 'M1S8rBLftYC6xhMu', network: Network.Devnet });
   
    (async () => {
      
      try {
      const balance = await shyft.wallet.getBalance({ wallet: 'V7ZEdjPdr1PHmCmtKHGMM1EkjZC4jLn2n9wM9aDwdAp' });
      const history = await shyft.wallet.transactionHistory({network :  network , wallet : "V7ZEdjPdr1PHmCmtKHGMM1EkjZC4jLn2n9wM9aDwdAp" })
      const send =  await shyft.wallet.sendSol({network: "devnet" , fromAddress :  'V7ZEdjPdr1PHmCmtKHGMM1EkjZC4jLn2n9wM9aDwdAp' , toAddress : "NmyYP3c2vW2vBPZjgE1bFy5cVQxWiXJhVdQwkWtXUfm" , amount : 2})
     
    
      } catch (error) {
       console.log(error);
      }
      
    })();
  }
  const checkPhantom = async () => {
    if (window.solana) {
      setWallet(window.solana);
    }
  };

  const handleConnect = async () => {
    if (!wallet) {
      console.error('Phantom Wallet not available');
      return;
    }

    try {
      await wallet.connect();
      const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');
      const publicKey = wallet.publicKey.toString();
      setPublicKey(publicKey);
      setConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDisconnect = async () => {
    if (!wallet) {
      console.error('Phantom Wallet not available');
      return;
    }

    try {
      await wallet.disconnect();
      setConnected(false);
      setPublicKey('');
    } catch (err) {
      console.error(err);
    }
  };

  
  
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    {connected ? (
      <View>
        <Text>Connected to Phantom Wallet</Text>
        <Text>Public Key: {publicKey}</Text>
        <Button title="Disconnect" onPress={handleDisconnect} />
      </View>
    ) : (
      <Button title="Connect to Phantom Wallet" onPress={handleConnect} />
    )}
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