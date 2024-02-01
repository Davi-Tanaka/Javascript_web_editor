import { createContext, Dispatch } from "react";
import { ConfigContextInterface } from "@interfaces/context/ConfigContext";

type ConfigContextArrayInterface = [
  ConfigContextInterface,
  Dispatch<ConfigContextInterface>
]

const ConfigContext = createContext<ConfigContextArrayInterface | null>(null);

export { ConfigContext };