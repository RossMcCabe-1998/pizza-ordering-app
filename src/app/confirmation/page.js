"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Container, Paper, Typography, Box, List, ListItem, ListItemText, Divider } from "@mui/material";

export default function ConfirmationPage() {
    const params = useSearchParams();
    const id = params.get("id");

    // store the order returned from MongoDB
    const [order, setOrder] = useState(null);

    // load specific order for logged-in user
    useEffect(() => {
        fetch(`/api/getOrder?id=${id}`, {
            headers: {
                "x-user": localStorage.getItem("user"),
            },
        })
            .then((res) => res.json())
            .then((data) => setOrder(data.order));
    }, [id]);

    // show state loading while order is being fetched
    if (!order) {
        return (
            <Container sx={{ mt: 6 }}>
                <Typography align="center">Loading receipt…</Typography>
            </Container>
        );
    }

    // calculate total order price from order items
    const total = order.items
        .reduce((sum, item) => sum + Number(item.cost), 0)
        .toFixed(2);

    return (
        <Container maxWidth="sm" sx={{ mt: 6 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    ✔ Order Confirmed!
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6">Order Number:</Typography>
                    <Typography variant="body1">{id}</Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6">Delivery Address:</Typography>
                    <Typography variant="body1">{order.address}</Typography>
                </Box>

                <Typography variant="h6" sx={{ mb: 1 }}>
                    Items:
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

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6">Total</Typography>
                    <Typography variant="h6">€{total}</Typography>
                </Box>
            </Paper>
        </Container>
    );
}