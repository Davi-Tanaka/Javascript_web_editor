import "@styles/components/editor/ButtonsHeader.scss"

import { MouseEventHandler } from "react"

interface ButtonsHeadersProps {
  commandFunctions: {
    run: MouseEventHandler,
    config: MouseEventHandler,
    help: MouseEventHandler
  }
}


function ButtonsHeaders({ commandFunctions }: ButtonsHeadersProps) { 
  return(
    <>
      <div className="buttons_wrapper">
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
      </div>
    </>
  )
}

export default ButtonsHeaders;