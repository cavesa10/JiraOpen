import { useContext } from "react";

import NextLink from "next/link";

import { AppBar, IconButton, Toolbar, Typography, Link } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { UIContext } from "../../context/ui";

export const Navbar = () => {
  const { openSidemenu } = useContext(UIContext);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton onClick={openSidemenu} size="large" edge="start">
          <MenuOutlinedIcon />
        </IconButton>
        <NextLink href="/" passHref>
          <Link underline="none" color='white' >
            <Typography variant="h6">OpenJira</Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};
