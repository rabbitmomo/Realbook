import React, { useState } from "react";
import { BrowserProvider } from "ethers"; // Correct import from ethers v6
import { Box, Button, Typography } from "@mui/material";

const ConnectWallet = ({ onAddressChange }) => {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const provider = new BrowserProvider(window.ethereum); 
        const signer = await provider.getSigner();

        const address = await signer.getAddress();
        setWalletAddress(address);

        if (onAddressChange) {
          onAddressChange(address);
        }
      } catch (error) {
        console.error("Error connecting to wallet: ", error);
      }
    } else {
      alert("MetaMask is not installed!");
    }
  };

  return (
    <Box
  style={{
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%", 
  }}
>
  {walletAddress ? (
    <Box sx={{ display: "flex", gap: 1, justifyContent: "center", alignItems: "center" }}>
      <Typography variant="body2">Wallet Address:</Typography>
      <Typography variant="body2">{walletAddress}</Typography>
    </Box>
  ) : (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Button onClick={connectWallet}>Connect Wallet</Button>
    </Box>
  )}
</Box>

  );
};

export default ConnectWallet;
