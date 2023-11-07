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

import AgricultureIcon from "@mui/icons-material/Agriculture";

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
            <AgricultureIcon />
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
                  Home
                </Button>
                <Button
                  onClick={handleClick}
                  color="inherit"
                  variant="text"
                  size="large"
                  sx={{ fontSize: "20px", fontWeight: "500" }}
                >
                  ABOUT{" "}
                </Button>
                <Button
                  onClick={handleClickRes}
                  color="inherit"
                  variant="text"
                  size="large"
                  sx={{ fontSize: "20px", fontWeight: "500" }}
                >
                  RESOURCES
                </Button>
                <Button
                  onClick={handleClickImpact}
                  color="inherit"
                  variant="text"
                  size="large"
                  sx={{ fontSize: "20px", fontWeight: "500" }}
                >
                  {" "}
                  IMPACT{" "}
                </Button>
                <Button
                  onClick={handleClickContact}
                  color="inherit"
                  variant="text"
                  size="large"
                  sx={{ fontSize: "20px", fontWeight: "500" }}
                >
                  CONTACT US
                </Button>
              </Stack>

              <Menu anchorEl={anchorElm} open={open} onClose={handleClose}>
                <MenuItem component={Link} href="/whatWeDo">
                  WHAT WE DO
                </MenuItem>
                <MenuItem component={Link} href="/meetTheTeam">
                  MEET THE TEAM
                </MenuItem>
                <MenuItem component={Link} href="/support">
                  SUPPORT
                </MenuItem>
                <MenuItem component={Link} href="/partners">
                  PARTNERS
                </MenuItem>
                <MenuItem component={Link} href="/programs">
                  PROGRAMS
                </MenuItem>
              </Menu>

              <Menu
                anchorEl={anchorResElm}
                open={openRes}
                onClose={handleCloseRes}
              >
                <MenuItem component={Link} href="/recipes">
                  RECIPES & NUTRITION FACTS
                </MenuItem>
                <MenuItem component={Link} href="/exercises">
                  PHYSICAL ACTIVITY RESOURCES
                </MenuItem>
                <MenuItem component={Link} href="/training">
                  TRAINING
                </MenuItem>
              </Menu>

              <Menu
                anchorEl={anchorImpactElm}
                open={openImpact}
                onClose={handleCloseImpact}
                backgroundColor="green"
              >
                <MenuItem component={Link} href="/publications">
                  PUBLICATIONS
                </MenuItem>
                <MenuItem component={Link} href="/inTheNews">
                  IN THE NEWS
                </MenuItem>
              </Menu>

              <Menu
                anchorEl={anchorContactElm}
                open={openContact}
                onClose={handleCloseContact}
              >
                <MenuItem component={Link} href="/donate">
                  {" "}
                  DONATE
                </MenuItem>

                <MenuItem component={Link} href="/getInvolved">
                  {" "}
                  GET INVOLVED{" "}
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
