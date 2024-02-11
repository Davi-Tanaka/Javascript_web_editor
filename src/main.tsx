import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import ConfigContextProvider from "@context/ConfigContextProvider";

const $rootElement = document.querySelector("#application") as HTMLElement;
const root = createRoot($rootElement);

root.render(
  <StrictMode>
    <ConfigContextProvider>
      <App/>
    </ConfigContextProvider>
  </StrictMode>
);