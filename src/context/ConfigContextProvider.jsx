import { useState } from "react";

import { ConfigContext } from "./ConfigContext";

function ConfigContextProvider({ children }) {
  const { Provider } = ConfigContext;

  const [config, setConfig] = useState({
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