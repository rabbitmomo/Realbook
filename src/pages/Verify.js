// src/Verify.js

import React from "react";
import {
  IDKitWidget,
  ISuccessResult,
  VerificationLevel,
} from "@worldcoin/idkit";
import { Box, Button, Typography, Stack } from "@mui/material";

const Verify = () => {
  const handleVerify = async (proof) => {
    console.log("Verification proof received:", proof);

    const res = await fetch("/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proof),
    });

    if (!res.ok) {
      throw new Error("Verification failed");
    }

    const data = await res.json();
    console.log("Server response:", data);
  };

  const onSuccess = () => {
    console.log("Verification successful, redirecting...");
    window.location.href = "/success";
  };

  return (
    <Box>
      <Stack spacing={4}>
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "center" },
          }}
        >
          <IDKitWidget
            app_id="app_staging_76ca67c719dfdb2d97f4ad4e65ec0561" App ID
            action="verification" 
            onSuccess={onSuccess}
            handleVerify={handleVerify}
            verification_level={VerificationLevel.Orb}
          >
            {({ open }) => <Button onClick={open}>Verify with World ID</Button>}
          </IDKitWidget>
        </Box>
      </Stack>
    </Box>
  );
};

export default Verify;
