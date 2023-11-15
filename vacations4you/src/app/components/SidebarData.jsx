import React from "react";
import * as IconNameGi from "react-icons/gi";
import * as IconNameMd from "react-icons/md";
import * as IconNameFa from "react-icons/fa";
import * as IconNameIo from "react-icons/io";

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

export const SidebarAdminData = [
  {
    title: "Home",
    path: "/adminDashboard",
    icon: <IconNameFa.FaHome style={{ color: "#fff" }} />,
    cName: "nav-text",
  },
  {
    title: "Add New Agent",
    path: "/agent-register",
    icon: <IconNameIo.IoMdPersonAdd style={{ color: "#fff" }} />,
    cName: "nav-text",
  },
];

export const SidebarBackofficeData = [
  {
    title: "Add Details",
    path: "/addNewData",
    icon: <IconNameMd.MdNoteAdd style={{ color: "#fff" }} />,
    cName: "nav-text",
  },
  {
    title: "Cruise Details",
    path: "/cruise-details",
    icon: <IconNameGi.GiShipBow style={{ color: "#fff" }} />,
    cName: "nav-text",
  },
  {
    title: "Activity Details",
    path: "/activity-details",
    icon: <IconNameMd.MdRowing style={{ color: "#fff" }} />,
    cName: "nav-text",
  },
  {
    title: "Package Details",
    path: "/package-details",
    icon: <IconNameMd.MdFlightTakeoff style={{ color: "#fff" }} />,
    cName: "nav-text",
  },
];
