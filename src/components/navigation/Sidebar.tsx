import React, { useContext, memo, useMemo, useState, useEffect } from "react";

import { ConfigContext } from "@/context/ConfigContext";
import { FlexDirection } from "@interfaces/Styles";
import { formatID } from "@/reusables/formatID";

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
  const [ windowW, setWindowW ] = useState(window.innerWidth)
  const [ SidebarIsOpen, setSidebarState ] = useState(false)

  const [ config, setConfig ] = useContext(ConfigContext);

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

  let navbarClasses = `sidebar ${(config.theme == "dark") ? 'theme-dark' : ''} ${(!SidebarIsOpen && windowW < 720) ? "closed" : ''}`;

  return(
    <>
      <nav
        className={ navbarClasses } 
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
        {
          (windowW < 720) 
            &&
          (
            <div className="close_sidebar_on_mobile">
              <button
                onClick={(e) => setSidebarState(!SidebarIsOpen)}
              >
                <span className="material-symbols-outlined">
                  { SidebarIsOpen ? "keyboard_arrow_up" : "keyboard_arrow_down" }
                </span>
              </button>
            </div>
          )
        }
      </nav>
    </>
  )
}

export default memo(Sidebar);