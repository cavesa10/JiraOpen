import { useContext } from 'react';
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { UIContext } from "../../context/ui";

export const Navbar = () => {

  const {openSidemenu } = useContext(UIContext);

  return (
    <AppBar position="sticky" >
      <Toolbar>
        <IconButton onClick={openSidemenu} size="large" edge="start" >
          <MenuOutlinedIcon/>
        </IconButton>
        <Typography variant="h6" >OpenJira</Typography>
      </Toolbar>
    </AppBar>
  );
};
