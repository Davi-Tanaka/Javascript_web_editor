import ModalTemplate from "@components/modals/ModalTemplate";
import Sidebar from "@components/navigation/Sidebar";
import Item from "@components/navigation/Item";

import { ConfigContext } from "@/context/ConfigContext";

import styles from "@styles/components/modals/ModalContent.module.scss";
import { useContext, useEffect } from "react";

function ConfigModal({ closeFunc }) {
  const  [ config, setConfig ] = useContext(ConfigContext);

  function changeTheme(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.currentTarget.value;

    setConfig({
      theme: value
    });
  }

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

        <div className={styles.modal_content}
          style={{
            width: `calc(100% - ${sidebar.w})`
          }}>

          <div className={styles.modal_section} id="editor-configuration">
            <div className={styles.section_content}>
              <div className={styles.label_wrapper}>
                <label htmlFor="theme_select">Tema:</label>

                <select 
                  className={styles.select}
                  name="theme" 
                  id="theme_select" 
                  defaultValue={config.theme} 
                  onChange={changeTheme}>

                    <option value="light">Claro</option>
                    <option value="dark">Escuro</option>
                </select>
              </div>
            </div>
          </div>
        </div>

      </ModalTemplate>
    </>
  )
}

export default ConfigModal