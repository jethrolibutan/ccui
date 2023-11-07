import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  Menu,
  MenuItem,
  Link,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DrawerComp from "./DrawerComp";
import BuildIcon from "@mui/icons-material/Build";

function Navbar() {
  const [anchorElm, setAnchorElm] = useState(null);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setAnchorElm(null);
    setOpen(false);
  };
  const handleClick = (e) => {
    setAnchorElm(e.currentTarget);
    setOpen(true);
  };

  const [anchorResElm, setAnchorResElm] = useState(null);
  const [openRes, setOpenRes] = useState(false);
  const handleCloseRes = () => {
    setAnchorResElm(null);
    setOpenRes(null);
  };
  const handleClickRes = (e) => {
    setAnchorResElm(e.currentTarget);
    setOpenRes(true);
  };

  const [anchorImpactElm, setAnchorImpactElm] = useState(null);
  const [openImpact, setOpenImpact] = useState(null);
  const handleCloseImpact = () => {
    setAnchorImpactElm(null);
    setOpenImpact(null);
  };
  const handleClickImpact = (e) => {
    setAnchorImpactElm(e.currentTarget);
    setOpenImpact(true);
  };

  const [anchorContactElm, setAnchorContactElm] = useState(null);
  const [openContact, setOpenContact] = useState(null);
  const handleCloseContact = () => {
    setAnchorContactElm(null);
    setOpenContact(null);
  };
  const handleClickContact = (e) => {
    setAnchorContactElm(e.currentTarget);
    setOpenContact(true);
  };

  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);

  return (
    <div>
      <AppBar
        position="static"
        backgroundColor="primary"
        style={{ background: " #3c3c3c" }}
      >
        <Toolbar>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <BuildIcon />
          </IconButton>
          <Typography size="large" edge="start" marginRight="auto" variant="h5">
            Contractor Control
          </Typography>
          {isMatch ? (
            <>
              <DrawerComp />
            </>
          ) : (
            <>
              <Stack direction="row" spacing={2}>
                <Button
                  href="/"
                  color="inherit"
                  variant="text"
                  size="large"
                  sx={{ fontSize: "20px", fontWeight: "500" }}
                >
                  Dashboard
                </Button>
                <Button
                  onClick={handleClick}
                  color="inherit"
                  variant="text"
                  size="large"
                  sx={{ fontSize: "20px", fontWeight: "500" }}
                >
                  Inventory
                </Button>
                <Button
                  onClick={handleClick}
                  color="inherit"
                  variant="text"
                  size="large"
                  sx={{ fontSize: "20px", fontWeight: "500" }}
                >
                  Invoice
                </Button>
                <Button
                  onClick={handleClick}
                  color="inherit"
                  variant="text"
                  size="large"
                  sx={{ fontSize: "20px", fontWeight: "500" }}
                >
                  Quote
                </Button>
                <Button
                  onClick={handleClick}
                  color="inherit"
                  variant="text"
                  size="large"
                  sx={{ fontSize: "20px", fontWeight: "500" }}
                >
                  Time Clock
                </Button>
                <Button
                  onClick={handleClick}
                  color="inherit"
                  variant="text"
                  size="large"
                  sx={{ fontSize: "20px", fontWeight: "500" }}
                >
                  Profile
                </Button>
              </Stack>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
