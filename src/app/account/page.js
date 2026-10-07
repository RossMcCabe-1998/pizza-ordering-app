"use client";

import Link from "next/link";
import { Container, Paper, Typography, Box, Button, Alert } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function AccountPage() {
    // read the logged-in user from localStorage
    const user =
        typeof window !== "undefined" ? localStorage.getItem("user") : null;

    // if no user is logged in block access to account page
    if (!user) {
        return (
            <Container maxWidth="sm" sx={{ mt: 6 }}>
                <Alert severity="warning">
                    You must be logged in to view your account.
                </Alert>
            </Container>
        );
    }

    // if the user is logged in, show their account information
    return (
        <Container maxWidth="sm" sx={{ mt: 6 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <AccountCircleIcon sx={{ fontSize: 50, mr: 2 }} color="primary" />
                    <Typography variant="h4">My Account</Typography>
                </Box>

                <Typography variant="body1" sx={{ mb: 3 }}>
                    <strong>Logged in as:</strong> {user}
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Button
                        variant="outlined"
                        component={Link}
                        href="/orders"
                        size="large"
                    >
                        View Order History
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}