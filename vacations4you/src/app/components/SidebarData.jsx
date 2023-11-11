import React from "react";
import * as IconNameGi from "react-icons/gi";
import * as IconNameMd from "react-icons/md";

export const SidebarData = [
  {
    title: "Cruise Booking",
    path: "/cruise",
    icon: <IconNameGi.GiShipBow style={{ color: "#fff" }} />,
    cName: "nav-text",
  },
  {
    title: "Activity Booking",
    path: "/activity",
    icon: <IconNameMd.MdRowing style={{ color: "#fff" }} />,
    cName: "nav-text",
  },
  {
    title: "Package Booking",
    path: "/package",
    icon: <IconNameMd.MdFlightTakeoff style={{ color: "#fff" }} />,
    cName: "nav-text",
  },
];
