import "@styles/components/editor/ButtonsHeader.scss"

import { MouseEventHandler, useCallback, useEffect, useMemo , useContext} from "react"

import { useRippleEffect } from "@/hooks/useRippleEffect"

import { ConfigContext } from "@/context/ConfigContext"

interface ButtonsHeadersProps {
  commandFunctions: {
    run: MouseEventHandler,
    config: MouseEventHandler,
    help: MouseEventHandler,
    clear: MouseEventHandler
  }
}

function ButtonsHeaders({ commandFunctions }: ButtonsHeadersProps) {
  const [config, setConfig] = useContext(ConfigContext);
  const headerClass: string = config.theme == "dark" ? "buttons_wrapper theme-dark" : "buttons_wrapper";
  
  const changeButtonStateOnClick = (e: MouseEvent)=> {
    var target = e.currentTarget as HTMLButtonElement;

    target.classList.add("clicked");

    setTimeout(() => {
      target.classList.remove("clicked");
    }, 100)
  };

  useEffect(() => {
    const buttons = document.querySelectorAll(".buttons_wrapper button");
    const Ripple = useRippleEffect

    buttons.forEach(button => {
      button.addEventListener("click", (e: MouseEvent) => Ripple(e, 1000))
      button.addEventListener("click", changeButtonStateOnClick);
    })
  }, []);

  return(
    <>
      <div className={headerClass}>
        <button 
          className="run" title="Executar codigo"
          onClick={e => commandFunctions.run(e)}
          >
          <span className="material-symbols-outlined">play_arrow</span>
        </button>
        <button 
          className="config"  title="Configurar Editor"
          onClick={e => commandFunctions.config(e)}
          >
          <span className="material-symbols-outlined">manufacturing</span>
        </button>
        <button 
          className="help"  title="Ajuda"
          onClick={e => commandFunctions.help(e)}
          >
          <span className="material-symbols-outlined">question_mark</span>
        </button>
        <button 
          className="clear_console"  title="Limpar console"
          onClick={e => commandFunctions.clear(e)}
          >
          <span className="material-symbols-outlined">mop</span>
        </button>
      </div>
    </>
  )
}

export default ButtonsHeaders;