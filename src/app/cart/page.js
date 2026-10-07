"use client";

import { useState, useEffect } from "react";
import { Container, Paper, Typography, Box, List, ListItem, ListItemText, IconButton, Button, Divider, Alert} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";

export default function CartPage() {
    // store cart items loaded from MongoDB
    const [cart, setCart] = useState([]);
    // read the logged-in user from localStorage
    const user =
        typeof window !== "undefined" ? localStorage.getItem("user") : null;

    // Load cart from MongoDB when user is logged in
    useEffect(() => {
        if (!user) {
            setCart([]);
            return;
        }

        // fetch the logged-in users cart from the backend
        fetch("/api/getCart", {
            headers: {
                "x-user": user,
            },
        })
            .then((res) => res.json())
            .then((data) => setCart(data.items || []))
            .catch(console.error);
    }, [user]);

    // Remove item from MongoDB, update UI immediate
    const removeItem = async (productId) => {
        await fetch(`/api/removeFromCart?id=${productId}`, {
            headers: {
                "x-user": user,
            },
        });
        setCart((prev) => prev.filter((item) => item.productId !== productId));
    };

    // calculate total price based on current cart state
    const totalPrice = cart
        .reduce((sum, item) => sum + Number(item.cost), 0)
        .toFixed(2);

    return (
        <Container maxWidth="sm" sx={{ mt: 6 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Your Cart
                </Typography>

                {cart.length === 0 && (
                    <Alert severity="info">Your cart is empty.</Alert>
                )}

                {cart.length > 0 && (
                    <>
                        <List>
                            {cart.map((item) => (
                                <ListItem
                                    key={item._id}
                                    secondaryAction={
                                        <IconButton
                                            edge="end"
                                            color="error"
                                            onClick={() => removeItem(item.productId)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemText
                                        primary={item.pname}
                                        secondary={`€${Number(item.cost).toFixed(2)}`}
                                    />
                                </ListItem>
                            ))}
                        </List>

                        <Divider sx={{ my: 2 }} />

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 2,
                            }}
                        >
                            <Typography variant="h6">Total</Typography>
                            <Typography variant="h6">€{totalPrice}</Typography>
                        </Box>

                        <Box sx={{ textAlign: "center" }}>
                            <Button
                                component={Link}
                                href="/checkout"
                                variant="contained"
                                color="success"
                                size="large"
                                fullWidth
                            >
                                Proceed to Checkout
                            </Button>
                        </Box>
                    </>
                )}
            </Paper>
        </Container>
    );
}