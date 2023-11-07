import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  IconButton,
} from "@mui/material";

import BuildIcon from "@mui/icons-material/Build";

function Navbar() {
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
              href="/inventory"
              color="inherit"
              variant="text"
              size="large"
              sx={{ fontSize: "20px", fontWeight: "500" }}
            >
              Inventory
            </Button>
            <Button
              href="/invoice"
              color="inherit"
              variant="text"
              size="large"
              sx={{ fontSize: "20px", fontWeight: "500" }}
            >
              Invoice
            </Button>
            <Button
              href="/quote"
              color="inherit"
              variant="text"
              size="large"
              sx={{ fontSize: "20px", fontWeight: "500" }}
            >
              Quote
            </Button>
            <Button
              href="/timeclock"
              color="inherit"
              variant="text"
              size="large"
              sx={{ fontSize: "20px", fontWeight: "500" }}
            >
              Time Clock
            </Button>
            <Button
              href="/profile"
              color="inherit"
              variant="text"
              size="large"
              sx={{ fontSize: "20px", fontWeight: "500" }}
            >
              Profile
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
