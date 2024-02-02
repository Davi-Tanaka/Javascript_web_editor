import React, { useContext, memo, useMemo } from "react";

import { ConfigContext } from "@/context/ConfigContext";
import { FlexDirection } from "@interfaces/Styles";

import "@styles/components/navigation/Sidebar.scss";

interface NavbarItem {
  googleIcon?: string,
  item: string,
  goTo?: string
}

interface SidebarProps {
  items: NavbarItem[],
  width?: string,
  height?: string,
}

function Sidebar({ items, height, width }: SidebarProps) {
  const  [ config, setConfig ] = useContext(ConfigContext);
  const defaultConfig = {
    width: "5em",
    height: "100%"
  }

  const renderizedItems = useMemo(() => items.map(item => {
    return(
      <li className="item">
        <a href={ item.goTo || "#" } className="hyper-link">
          {
            (item.googleIcon != null && item.googleIcon != undefined)
            &&
            <div className="icon-wrapper">
              <span className="material-symbols-outlined">
                { item.googleIcon }
              </span>
            </div>
          }
          <div className="value-wrapper">
            <span className="value">
              { item.item }
            </span>
          </div>
        </a>
      </li>
    )
  }), []);

  return(
    <>
      <nav
        className={ config.theme == "dark" ? "sidebar theme-dark" : "sidebar" } 
        style={{
            width: width || defaultConfig.width,
            height: height || defaultConfig.height,
        }}
      >
        <ul>
          {
            renderizedItems
          }
        </ul>
      </nav>
    </>
  )
}

export default memo(Sidebar);