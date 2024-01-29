import ModalTemplate from "@components/modals/ModalTemplate";
import Sidebar from "@components/navigation/Sidebar";
import Item from "@components/navigation/Item";

import "@styles/components/modals/Config.scss";
import { useRef } from "react";

function ConfigModal({ closeFunc }) {
  const sidebar = {
    w: "10em"
  };

  return(
    <>
      <ModalTemplate
        title="Configuração"
        functionToCloseTheModel={closeFunc}>

        <Sidebar
          width={sidebar.w}
          >
            
          <Item value="Editor" goTo="#editor-configuration"/>
        </Sidebar>

        <div className="modal-content"
          style={{
            width: `calc(100% - ${sidebar.w})`
          }}>

          <div className="modal-section" id="editor-configuration">
            <div className="wrapper-title">
              <h5 className="title">Editor</h5>
            </div>
            
            <div className="section-content">
              <div className="label-wrapper">
                <label htmlFor="theme_select">Tema:</label>

                <select name="theme" id="theme_select" defaultValue="light">
                    <option value="light">Claro</option>
                    <option value="dark">Escuro</option>
                </select>
              </div>

              <div className="label-wrapper">
                <label htmlFor="">Tamanho do tab:</label>
                <input 
                  type="number" 
                  name="tabWidthInput" 
                  id="tabWidthInput" 
                  defaultValue={2}
                  />
              </div>
              
            </div>
          </div>
        </div>

      </ModalTemplate>
    </>
  )
}

export default ConfigModal