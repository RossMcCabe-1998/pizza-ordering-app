"use client";

import {Card, CardContent, CardActions, Button, Typography, Box, Grid, Paper, CardMedia} from "@mui/material";
import Link from "next/link";
import * as React from "react";

export default function DashboardPage() {

    return (
        <>
            <Typography variant="h4" align="center" sx={{ mt: 2, mb: 3 }}>
                Menu
            </Typography>

            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>

                <Grid item xs={12} sm={6} >
                    <Card variant="outlined" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                        <Box sx={{ px: 2, py: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                            <Typography variant="h6">Pizza's</Typography>
                        </Box>

                        {/* image */}
                        <Box
                            sx={{
                                flexGrow: 1,
                                minHeight: 200,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                bgcolor: "grey.100",
                                overflow: "hidden",
                            }}
                        >
                            <CardMedia
                                component="img"
                                image="/margherita.png"
                                alt="Pizza"
                                sx={{
                                    width: "20%",
                                    height: "20%",
                                    objectFit: "cover",
                                }}
                            />
                        </Box>

                        <CardActions sx={{ p: 2, justifyContent: "center" }}>
                            <Link href="/menuPizza" passHref>
                                <Button variant="outlined" fullWidth color="primary">Menu</Button>
                            </Link>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Card variant="outlined" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                        <Box sx={{ px: 2, py: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                            <Typography variant="h6">Sides</Typography>
                        </Box>

                        {/* image */}
                        <Box
                            sx={{
                                flexGrow: 1,
                                minHeight: 160,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                bgcolor: "grey.100"
                            }}
                        >
                            <CardMedia
                                component="img"
                                image="/wings.png"
                                alt="Side"
                                sx={{
                                    width: "20%",
                                    height: "20%",
                                    objectFit: "cover",
                                }}
                            />
                        </Box>

                        <CardActions sx={{ p: 2, justifyContent: "center" }}>
                            <Link href="/menuSides" passHref>
                                <Button variant="outlined" fullWidth color="primary">Menu</Button>
                            </Link>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Card variant="outlined" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                        <Box sx={{ px: 2, py: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                            <Typography variant="h6">Drinks</Typography>
                        </Box>

                        {/* image */}
                        <Box
                            sx={{
                                flexGrow: 1,
                                minHeight: 160,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                bgcolor: "grey.100"
                            }}
                        >
                            <CardMedia
                                component="img"
                                image="/coke.png"
                                alt="Drink"
                                sx={{
                                    width: "20%",
                                    height: "20%",
                                    objectFit: "cover",
                                }}
                            />
                        </Box>

                        <CardActions sx={{ p: 2, justifyContent: "center" }}>
                            <Link href="/menuDrinks" passHref>
                                <Button variant="outlined" fullWidth color="primary">Menu</Button>
                            </Link>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Card variant="outlined" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                        <Box sx={{ px: 2, py: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                            <Typography variant="h6">Deserts</Typography>
                        </Box>

                        {/* image */}
                        <Box
                            sx={{
                                flexGrow: 1,
                                minHeight: 160,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                bgcolor: "grey.100"
                            }}
                        >
                            <CardMedia
                                component="img"
                                image="/ben&jerry.png"
                                alt="Dessert"
                                sx={{
                                    width: "20%",
                                    height: "20%",
                                    objectFit: "cover",
                                }}
                            />
                        </Box>

                        <CardActions sx={{ p: 2, justifyContent: "center" }}>
                            <Link href="/menuDessert" passHref>
                                <Button variant="outlined" fullWidth color="primary">Menu</Button>
                            </Link>
                        </CardActions>
                    </Card>
                </Grid>

            </Paper>
        </>
    );
}