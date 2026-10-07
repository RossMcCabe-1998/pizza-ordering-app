"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardActions, Button, Typography, Box, Grid, Paper, Container, CardMedia } from "@mui/material";
import Link from "next/link";
import { addToLocalCart } from "../utils/cartStorage";

export default function MenuPage() {
    // store products returned from the backend
    const [data, setData] = useState(null);

    // load dessert products from MongoDB
    useEffect(() => {
        fetch("/api/getProducts?cat=Dessert")
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);

    // show state loading while products are being fetched
    if (!data) {
        return (
            <Container sx={{ mt: 6 }}>
                <Typography align="center">Loading Desserts…</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" align="center" sx={{ mb: 3 }}>
                Desserts
            </Typography>

            <Grid container spacing={3}>
                {data.map((item) => (
                    <Grid item xs={12} sm={6} key={item._id}>
                        <Card
                            variant="outlined"
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {/* image */}
                            <Box sx={{ height: 220, overflow: "hidden" }}>
                                <CardMedia
                                    component="img"
                                    image={item.imageUrl}
                                    alt={item.pname}
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </Box>

                            {/* content */}
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" gutterBottom>
                                    {item.pname}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mb: 2 }}
                                >
                                    {item.description}
                                </Typography>

                                <Typography variant="h6" color="primary">
                                    €{Number(item.cost).toFixed(2)}
                                </Typography>
                            </CardContent>

                            <CardActions sx={{ p: 2, gap: 1 }}>
                                <Button
                                    component={Link}
                                    href={`/product?id=${item._id}`}
                                    variant="outlined"
                                    fullWidth
                                >
                                    View
                                </Button>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => {
                                        // add item to local cart
                                        addToLocalCart(item);
                                        // add item to mongoDB cart for logged-in user
                                        fetch(`/api/addToCart?id=${item._id}`, {
                                            headers: {
                                                "x-user": localStorage.getItem("user"),
                                            },
                                        })
                                            .then((res) => res.json())
                                            .then(() => console.log("Added to cart"));
                                    }}
                                >
                                    Add to Cart
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}