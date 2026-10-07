"use client";

import { useState, useEffect } from "react";
import { TextField, Button, Typography, Container, Alert, Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    // store cart items loaded from MongoDB
    const [cart, setCart] = useState([]);
    // store checkout form fields
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [errors, setErrors] = useState({});

    // used to redirect after successful checkout
    const router = useRouter();
    // read the logged-in user from localStorage
    const user =
        typeof window !== "undefined" ? localStorage.getItem("user") : null;

    // load logged-in users cart from MongoDB
    useEffect(() => {
        if (!user) {
            setCart([]);
            return;
        }
        fetch("/api/getCart", {
            headers: {
                "x-user": user,
            },
        })
            .then((res) => res.json())
            .then((data) => setCart(data.items || []))
            .catch(console.error);
    }, [user]);

    // validate checkout form fields
    const validate = () => {
        const e = {};
        if (!first.trim()) e.first = "First name required";
        if (!last.trim()) e.last = "Last name required";
        if (!phone.trim()) e.phone = "Phone number required";
        if (!address.trim()) e.address = "Address required";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    // calculate total price from cart items
    const totalPrice = cart.reduce(
        (sum, item) => sum + Number(item.cost), 0
    );

    // submit checkout request to backend
    const checkout = () => {
        if (!validate()) return;

        fetch("/api/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-user": user,
            },
            body: JSON.stringify({
                address,
                first,
                last,
                phone,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.orderId) {
                    // clear local UI cache (DB cleared in checkout API)
                    localStorage.removeItem("cart");
                    // redirect to order confirmation page
                    router.push(`/confirmation?id=${data.orderId}`);
                }
            });
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 6 }}>
            <Typography variant="h4" gutterBottom align="center">
                Checkout
            </Typography>

            {cart.length === 0 && (
                <Alert severity="warning">Your cart is empty.</Alert>
            )}

            <Typography variant="h6" sx={{ mt: 2 }}>
                Total: €{totalPrice.toFixed(2)}
            </Typography>

            <TextField
                label="First Name"
                fullWidth
                sx={{ mt: 2 }}
                value={first}
                error={!!errors.first}
                helperText={errors.first}
                onChange={(e) => setFirst(e.target.value)}
            />

            <TextField
                label="Last Name"
                fullWidth
                sx={{ mt: 2 }}
                value={last}
                error={!!errors.last}
                helperText={errors.last}
                onChange={(e) => setLast(e.target.value)}
            />

            <TextField
                label="Phone Number"
                fullWidth
                sx={{ mt: 2 }}
                value={phone}
                error={!!errors.phone}
                helperText={errors.phone}
                onChange={(e) => setPhone(e.target.value)}
            />

            <TextField
                label="Delivery Address"
                fullWidth
                multiline
                minRows={3}
                sx={{ mt: 2 }}
                value={address}
                error={!!errors.address}
                helperText={errors.address}
                onChange={(e) => setAddress(e.target.value)}
            />

            <Box sx={{ mt: 3 }}>
                <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    disabled={cart.length === 0}
                    onClick={checkout}
                >
                    Confirm Order
                </Button>
            </Box>
        </Container>
    );
}