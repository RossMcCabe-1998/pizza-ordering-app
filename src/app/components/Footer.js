"use client";

import Box from "@mui/material/box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Footer(){
    return(
        <Box
            component="footer"
            sx={{
                py: 3,
                mt: 4,
                borderTop: "1px solid black",
                color: "black"
            }}
        >
            <Container maxWidth="lg">
                <Typography variant="body2" align="center">
                    © Pizza Shop
                </Typography>
            </Container>
        </Box>
    );
}