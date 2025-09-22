"use client";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { useEffect, useState } from "react";
export default function SignupSection() {
  const [bgLoaded, setBgLoaded] = useState(false);
  const [email, setEmail] = useState("");
  useEffect(() => {
    setBgLoaded(true);
  }, []);
  return (
    <Box
      sx={{
        //         backgroundImage: bgLoaded ? `url(${BGIMG.src})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: 2,
          boxShadow: 3,
          padding: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Unlock your Hostel Account to Freedom!
        </Typography>
        <Typography variant="body1" mb={3}>
          Sign up with Hostelz.com and get access to exclusive hostel content
          and much more.
        </Typography>
        <TextField
          fullWidth
          label="What is your best email?"
          variant="outlined"
          type="email"
          sx={{ mb: 2 }}
          defaultValue=""
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button variant="contained" color="error" fullWidth>
          SIGN UP
        </Button>
        <Typography variant="body2" mt={2}>
          Do you already have an account?{" "}
          <Link href="/login" underline="hover">
            Login
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}
