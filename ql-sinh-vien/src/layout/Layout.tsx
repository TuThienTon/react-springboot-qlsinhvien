import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import "./Layout.css";
import { useState } from "react";

function Layout() {
  const [showSidebar, setShowSidebar] = useState<boolean>(false)
  const handleCollapseMenu = () => {
    setShowSidebar(!showSidebar)
  }

  // classNames({
  //   btn: true,
  //   'btn-pressed': this.state.isPressed,
  //   'btn-over': !this.state.isPressed && this.state.isHovered
  // })

  return (
    <>
      <NavBar handleCollapseMenu={handleCollapseMenu} />
      <div className="d-flex">
        <SideBar />
        <div
          className="px-3 py-3"
          style={{
            marginLeft: "310px",
            overflow: "auto",
            width: "100%",
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
