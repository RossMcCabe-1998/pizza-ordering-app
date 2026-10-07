"use client";

import { Box, Container, Grid, Paper, Typography, Card, CardContent, CardActions, Button, CardMedia } from '@mui/material';
import Link from 'next/link';
import * as React from 'react';
import { useState, useEffect } from 'react';

export default function HomePage() {
    // store featured products returned from the mongoDB
    const [data, setData] = useState(null);

    // load featured products from mongoDB
    useEffect(() => {
        fetch("http://localhost:3000/api/getProducts?featured=true")
            .then(res => res.json())
            .then(data => setData(data));
    }, []);

    // show state loading while products are being fetched
    if (!data) return <p>Loading...</p>;

    return (
        <>
            <Typography variant="h4" align="center" sx={{ mt: 2, mb: 3 }}>
                Home
            </Typography>

            {/* banner */}
            <Paper
                variant="outlined"
                sx={{
                    height: { xs: 180, sm: 240, md: 300 },
                    mb: 3,
                    overflow: "hidden",
                }}
            >
                <CardMedia
                    component="img"
                    image="/bannerPic.jpg"
                    alt="Banner"
                    sx={{ height: "100%", objectFit: "cover" }}
                />
            </Paper>

            {/* featured products section */}
            <Container sx={{ pb: 4 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                    Featured Products
                </Typography>

                <Grid container spacing={10} justifyContent="space-between">
                    {data.slice(0, 3).map((item) => (
                        <Grid key={item._id} item xs={12} md={4}>
                            <Card
                                variant="outlined"
                                sx={{ height: "100%", display: "flex", flexDirection: "column" }}
                            >
                                {/* image */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <img
                                        src={item.imageUrl}

                                        alt={item.pname}

                                        style={{ width: "90%", height: "90%" ,maxWidth: 400 }}
                                    />
                                </Box>

                                {/* content */}
                                <CardContent>
                                    <Typography variant="h6">{item.pname}</Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        {item.description}
                                    </Typography>

                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        €{Number(item.cost).toFixed(2)}
                                    </Typography>
                                </CardContent>

                                <CardActions sx={{ mt: "auto", p: 2, pt: 0 }}>
                                    <Button
                                        variant="outlined"
                                        component={Link}
                                        href={`/product?id=${item._id}`}
                                    >
                                        View
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}
