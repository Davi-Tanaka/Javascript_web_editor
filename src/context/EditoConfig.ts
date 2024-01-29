import { createContext } from "react";
import { Config } from "@interfaces/editor/Config";

const EditorContext = createContext<Config>({
  theme: "light",
  tabWidth: 2
})

export { EditorContext };