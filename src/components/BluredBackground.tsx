import { useContext } from "react";
import { ConfigContext } from "@/context/ConfigContext";

import "@styles/components/BluredBackground.scss";

function BluredBackground({ children }) {
  const  [ config, setConfig ] = useContext(ConfigContext);

  return(
    <div className={ config.theme == "dark" ? "screen theme-dark" : "screen"}>
      { children }
    </div>
  )
}

export default BluredBackground;