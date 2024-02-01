import { useState, useContext } from "react";

import { ConfigContext } from "./ConfigContext";
import { ConfigContextInterface } from "@interfaces/context/ConfigContext";

function ConfigContextProvider({ children }) {
  const { Provider } = ConfigContext;

  const [config, setConfig] = useState<ConfigContextInterface>({
    theme: "light"
  });

  return(
    <>
      <Provider value={[config, setConfig]}>
        { children }
      </Provider>
    </>
  )
}

export default ConfigContextProvider