import React from "react";
import { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Link,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import BuildIcon from "@mui/icons-material/Build";
import AnchorIcon from "@mui/icons-material/Anchor";

function DrawerComp() {
  // These two variables control the opening and the setting of the open of the drawer
  const [openDrawer, setOpenDrawer] = useState(false);

  // These two variables control the opening of "About" dropdown menu
  const [openAbout, setOpenAbout] = React.useState(false);

  // Function that handles the click of the opening of a drop down menu
  const handleClick = () => {
    setOpenAbout(!openAbout);
  };

  // These two variables control the opening of "About" dropdown menu
  const [openResources, setOpenResources] = React.useState(false);

  // Function that handles the click of the opening of a drop down menu
  const handleClickResource = () => {
    setOpenResources(!openResources);
  };

  // These two variables control the opening of "About" dropdown menu
  const [openImpact, setOpenImpact] = React.useState(false);

  // Function that handles the click of the opening of a drop down menu
  const handleClickImpact = () => {
    setOpenImpact(!openImpact);
  };

  // These two variables control the opening of "About" dropdown menu
  const [openContact, setOpenContact] = React.useState(false);

  return (
    <div>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          <ListItemButton component={Link} href="/">
            <ListItemIcon>
              {" "}
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>HOME</ListItemText>
          </ListItemButton>

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="ABOUT" sx={{ pr: 3 }} />
            {openAbout ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openAbout} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} component={Link} href="/whatWeDo">
                <ListItemText primary="WHAT WE DO" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                component={Link}
                href="/meetTheTeam"
              >
                <ListItemText primary="MEET THE TEAM" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} component={Link} href="/support">
                <ListItemText primary="SUPPORT" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} component={Link} href="/partners">
                <ListItemText primary="PARTNERS" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} component={Link} href="/programs">
                <ListItemText primary="PROGRAMS" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={handleClickResource}>
            <ListItemIcon>
              <BuildIcon />
            </ListItemIcon>
            <ListItemText primary="RESOURCES" sx={{ pr: 3 }} />
            {openAbout ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openResources} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} component={Link} href="/recipes">
                <ListItemText primary="RECIPES" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} component={Link} href="/exercises">
                <ListItemText primary="EXERCISES" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} component={Link} href="/training">
                <ListItemText primary="TRAINING" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={handleClickImpact}>
            <ListItemIcon>
              <AnchorIcon />
            </ListItemIcon>
            <ListItemText primary="IMPACT" sx={{ pr: 3 }} />
            {openAbout ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openImpact} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                component={Link}
                href="/publications"
              >
                <ListItemText primary="PUBLICATIONS" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} component={Link} href="/inTheNews">
                <ListItemText primary="IN THE NEWS" />
              </ListItemButton>
            </List>
          </Collapse>

          <Collapse in={openContact} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} component={Link} href="/donate">
                <ListItemText primary="DONATE" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                component={Link}
                href="/getInvolved"
              >
                <ListItemText primary="GET INVOLVED" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </div>
  );
}

export default DrawerComp;
