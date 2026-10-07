"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Paper, Typography, TextField, Button, Box, Alert } from "@mui/material";

export default function RegisterPage() {
    // router for navigation after successful registration
    const router = useRouter();

    // form and UI state for registration credentials and error messages
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // handle registration submission
    const register = async () => {
        setError("");

        // validation for email and password
        if (!email || !password) {
            setError("Email and password are required");
            return;
        }
        setLoading(true);

        // send credentials to backend
        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        setLoading(false);

        if (data.status === "ok") {
            // alert message
            alert("Account created!");
            // redirect to login
            router.push("/login");
        } else {
            setError(data.error || "Registration failed");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 6 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Register
                </Typography>

                <Typography
                    variant="body2"
                    align="center"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >
                    Create an account
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    required
                    sx={{ mb: 3 }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    onClick={register}
                >
                    {loading ? "Creating account..." : "Create Account"}
                </Button>

                <Box textAlign="center" sx={{ mt: 3 }}>
                    <Typography variant="body2">
                        Already have an account?{" "}
                        <Button
                            variant="text"
                            size="small"
                            onClick={() => router.push("/login")}
                        >
                            Login
                        </Button>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}