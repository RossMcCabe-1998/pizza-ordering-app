"use client";

import { useEffect, useState } from "react";
import { Container, Paper, Typography, Box, Divider, List, ListItem, ListItemText, Alert } from "@mui/material";


export default function OrdersPage() {
    // store users orders loaded from MongoDB
    const [orders, setOrders] = useState(null);

    // load order history for logged-in user
    useEffect(() => {
        fetch("/api/getOrders", {
            headers: {
                "x-user": localStorage.getItem("user"),
            },
        })
            .then((res) => res.json())
            .then((data) => setOrders(data.orders));
    }, []);

    // show state loading while fetching order history
    if (!orders) {
        return (
            <Container maxWidth="sm" sx={{ mt: 6 }}>
                <Typography align="center">Loading order history…</Typography>
            </Container>
        );
    }

    // if user has no orders, show alert message
    if (orders.length === 0) {
        return (
            <Container maxWidth="sm" sx={{ mt: 6 }}>
                <Alert severity="info">You have no past orders.</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Your Orders
            </Typography>

            {orders.map((order) => {
                // calculate total price of each order
                const total = order.items
                    .reduce((sum, item) => sum + Number(item.cost), 0)
                    .toFixed(2);

                return (
                    <Paper
                        key={order._id}
                        elevation={3}
                        sx={{ p: 3, mb: 4 }}
                    >
                        {/* order header */}
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="h6">
                                Order #{order._id}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {new Date(order.createdAt).toLocaleString()}
                            </Typography>
                        </Box>

                        <Divider sx={{ mb: 2 }} />

                        {/* customer info */}
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body1">
                                <strong>Name:</strong> {order.first} {order.last}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Email:</strong> {order.userEmail}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Phone:</strong> {order.phone}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Address:</strong> {order.address}
                            </Typography>
                        </Box>

                        <Divider sx={{ mb: 2 }} />

                        {/* items */}
                        <Typography variant="h6" sx={{ mb: 1 }}>
                            Items
                        </Typography>

                        <List disablePadding>
                            {order.items.map((item) => (
                                <ListItem key={item._id} sx={{ px: 0 }}>
                                    <ListItemText
                                        primary={item.pname}
                                        secondary={`€${Number(item.cost).toFixed(2)}`}
                                    />
                                </ListItem>
                            ))}
                        </List>

                        <Divider sx={{ my: 2 }} />

                        {/* total */}
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="h6">Total</Typography>
                            <Typography variant="h6">€{total}</Typography>
                        </Box>
                    </Paper>
                );
            })}
        </Container>
    );
}