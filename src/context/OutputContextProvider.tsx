import { useState } from "react";
import { OutputContext } from "./Output";

function OutputContextProvider({ children }) {
  const [ OutputContextState, setOutputContextState ] = useState({
    isEmpty: false
  });

  const { Provider } = OutputContext
  
  return(
    <>
      <Provider value={[ OutputContextState, setOutputContextState ]}>
        { children }
      </Provider>
    </>
  )
}

export default OutputContextProvider;