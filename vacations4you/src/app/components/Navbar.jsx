import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import "../styles/navbar.css";
import { IconContext } from "react-icons";
import * as FiIcons from "react-icons/fi";


function NavBar() {
  const [sidebar, setSidebar] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("USER");
    localStorage.removeItem("shopping-cart");
    localStorage.removeItem("shopping-cart-activity");
    window.location.replace("/login");
  };

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <IconContext.Provider value={{ color: "#060b26" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>

        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose style={{ color: "#fff" }} />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li className="nav-text">
              <Link onClick={handleLogout}>
                <FiIcons.FiLogOut style={{ color: "#fff" }} />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default NavBar;
