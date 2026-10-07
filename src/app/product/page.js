"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Container, Grid, Paper, Typography, Card, CardMedia, CardContent, Button, Box } from "@mui/material";
import { addToLocalCart } from "../utils/cartStorage";


export default function ProductPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    // store product returned from the backend
    const [product, setProduct] = useState(null);

    // load product from MongoDB
    useEffect(() => {
        if (!id) return;
        fetch(`/api/getSingleProduct?id=${id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data.item))
            .catch(console.error);
    }, [id]);

    // show state loading while product is being fetched
    if (!product) {
        return (
            <Container sx={{ mt: 6 }}>
                <Typography align="center">Loading product…</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Grid container spacing={4}>
                    {/* image */}
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardMedia
                                component="img"
                                image={product.imageUrl}
                                alt={product.pname}
                                sx={{
                                    height: 350,
                                    objectFit: "cover",
                                }}
                            />
                        </Card>
                    </Grid>

                    {/* details */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                            <Typography variant="h4" gutterBottom>
                                {product.pname}
                            </Typography>

                            <Typography
                                variant="h6"
                                color="primary"
                                sx={{ mb: 2 }}
                            >
                                €{Number(product.cost).toFixed(2)}
                            </Typography>

                            <Typography variant="body1" sx={{ mb: 3 }}>
                                {product.description}
                            </Typography>

                            <Button
                                variant="contained"
                                size="large"
                                sx={{ mt: "auto" }}
                                onClick={() => {
                                    // add item to local cart
                                    addToLocalCart(product);
                                    // add item to mongoDB cart for logged-in user
                                    fetch(`/api/addToCart?id=${product._id}`, {
                                        headers: {
                                            "x-user": localStorage.getItem("user"),
                                        },
                                    })
                                        .then((res) => res.json())
                                        .then((data) => console.log("Synced:", data));
                                }}
                            >
                                Add to Cart
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}