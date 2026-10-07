"use client";

import { AppBar, Toolbar, Typography, Button, IconButton, } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import {useEffect, useState} from "react";
import { useRouter } from "next/navigation";


export default function NavBar() {
    // store currently logged-in user
    const [user, setUser] = useState(null);
    // load user from localStorage
    useEffect(() => {
       const stored = localStorage.getItem("user");
       if (stored) {
          setUser(stored);
       }
    }, []);

    const router = useRouter();

    return (
        <AppBar position="static">
            <Toolbar>

                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Pizza Shop
                </Typography>

                <Link href="/" passHref>
                    <Button color="inherit">Home</Button>
                </Link>

                <Link href="/dashboard" passHref>
                    <Button color="inherit">Menu</Button>
                </Link>

                {/* conditional rendering based on login state */}
                {user ? (
                    <>
                        <span>WELCOME {user}</span>
                        {/* logout clears localStorage and redirects home */}
                        <Button
                            color="inherit"
                            onClick={() => {
                                localStorage.removeItem("user");
                                localStorage.removeItem("cart");
                                setUser(null);
                                router.push("/");
                            }}
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        {/* login/register options when not logged in */}
                        <Link href="/login" passHref>
                            <Button color="inherit">Login</Button>
                        </Link>

                        <Link href="/register" passHref>
                            <Button color="inherit">Signup</Button>
                        </Link>
                    </>
                )}

                {/* account page icon shown only when logged in */}
                {user && (
                    <Link href="/account" passHref>
                        <IconButton color="inherit" sx={{ ml: 1 }}>
                            <AccountCircleIcon fontSize="large" />
                        </IconButton>
                    </Link>
                )}

                <Link href="/cart" passHref>
                    <IconButton color="inherit">
                        <ShoppingCartIcon />
                    </IconButton>
                </Link>

            </Toolbar>
        </AppBar>
    );
}