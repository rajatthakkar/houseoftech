"use client";
import { Box, Container, Typography, Link, Stack } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f5f5f5",
        borderTop: "1px solid #ddd",
        py: 4,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          {/* Branding */}
          <Typography variant="body1" color="text.secondary">
            © {new Date().getFullYear()} Hostelz.com — All rights reserved.
          </Typography>

          {/* Navigation Links */}
          <Stack direction="row" spacing={3}>
            <Link href="/about" color="text.secondary" underline="hover">
              About
            </Link>
            <Link href="/contact" color="text.secondary" underline="hover">
              Contact
            </Link>
            <Link href="/privacy" color="text.secondary" underline="hover">
              Privacy Policy
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
