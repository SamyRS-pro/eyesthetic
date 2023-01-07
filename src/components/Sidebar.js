import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";

const Nav = styled.div`
  position: fixed;
  background: #15171c;
  height: 8%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  z-index: 5;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 400ms;
  z-index: 10;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
    localStorage.setItem("sidebar", sidebar);
  };

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div style={{ width: windowSize.innerWidth }}>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <div
            style={{
              left: sidebar ? 270 : 70,
              position: "absolute",
              transition: "350ms",
              color: "white",
            }}
          >
            <div className="font">Eyesthetic</div>
          </div>
        </Nav>
        <SidebarNav
          sidebar={sidebar}
          style={{ height: windowSize.innerHeight }}
        >
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </div>
  );
};

export default Sidebar;
