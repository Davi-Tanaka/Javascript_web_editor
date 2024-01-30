import { FlexDirection } from "@interfaces/Styles";

import React from "react";

import "@styles/components/navigation/Sidebar.scss";

interface SidebarProps {
  children: React.ReactNode,
  direction?: FlexDirection,
  backgroundColor?: string,
  width?: string,
  height?: string
}

function Sidebar({ children, direction, backgroundColor, height, width}: SidebarProps) {
  const defaultConfig = {
    direction: "row",
    width: "5em",
    height: "100%"
  }

  return(
    <>
      <nav
        className="sidebar" 
        style={{
            flexDirection: direction || (defaultConfig.direction as FlexDirection),
            width: width || defaultConfig.direction,
            height: height || defaultConfig.height
        }}
      >
        <ul>
          { children }
        </ul>
      </nav>
    </>
  )
}

export default Sidebar;