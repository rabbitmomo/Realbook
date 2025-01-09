// src/Verify.js

import React, { useState } from "react";
import {
  IDKitWidget,
  VerificationLevel,
} from "@worldcoin/idkit";
import { Box, Button, Typography, Stack, CircularProgress } from "@mui/material";

const Verify = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleVerify = async (proof) => {
    if (!proof) {
      setError("Proof is undefined or invalid.");
      console.error("Proof is undefined:", proof);
      return;
    }

    // Check if 'proof' is an object, and validate its properties before using it
    if (proof && typeof proof === "object" && !Array.isArray(proof)) {
      if (!proof.hasOwnProperty('length')) {
        console.error("Proof object missing expected properties:", proof);
      }
    }

    setLoading(true);
    setError(null);

    try {
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
    } catch (err) {
      console.error("Error during verification:", err);
      setError("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onSuccess = (result) => {
    console.log("Verification successful, redirecting...");
    window.location.href = "/success";
  };

  return (
    <Box>
      <Stack spacing={4}>
        {error && (
          <Typography color="error" variant="h6">
            {error}
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "center" },
          }}
        >
          <IDKitWidget
            app_id="app_staging_76ca67c719dfdb2d97f4ad4e65ec0561" // App ID
            action="verification"
            onSuccess={onSuccess}
            handleVerify={handleVerify}
            verification_level={VerificationLevel.Orb}
          >
            {({ open }) => (
              <Button
                variant="contained"
                onClick={open}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Verify with World ID"}
              </Button>
            )}
          </IDKitWidget>
        </Box>
      </Stack>
    </Box>
  );
};

export default Verify;
