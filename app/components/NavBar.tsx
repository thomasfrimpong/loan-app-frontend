import React from "react";
import List from "@mui/material/List";
import Box from "@mui/material/Box";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import PaymentIcon from "@mui/icons-material/Payment";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const NavBar = ({ selectedIndex }: { selectedIndex: string }) => {
  return (
    <List component="nav">
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <List component="nav" aria-label="main mailbox folders">
          <ListItemButton
            component="a"
            href="/customers"
            selected={selectedIndex === "2"}
          >
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItemButton>
          <ListItemButton selected={selectedIndex === "3"} href="/loans">
            <ListItemIcon>
              <LocalGasStationIcon />
            </ListItemIcon>
            <ListItemText primary="Loans" />
          </ListItemButton>
        </List>
        <Divider />
      </Box>
      <Divider sx={{ my: 1 }} />
    </List>
  );
};

export default NavBar;
