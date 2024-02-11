import { useEffect, useContext, useState} from "react";

import ModalTemplate from "@components/modals/ModalTemplate";
import Sidebar from "@components/navigation/Sidebar";

import { ConfigContext } from "@/context/ConfigContext";

import styles from "@styles/components/modals/ModalContent.module.scss";

import { activeItemOnScroll } from "@/reusables/activeItemOnScroll";
import { formatID } from "@/reusables/formatID";

function ConfigModal({ closeFunc }) {
  const [ config, setConfig ] = useContext(ConfigContext);
  const [sidebar, setSidebar] = useState({
    w: "10em"
  });

  useEffect(() => {
    const sidebarItems = document.querySelectorAll(".sidebar .item");
    const contentSections = document.querySelectorAll("." + styles.modal_section);
    const modal_content = document.querySelector("." + styles.modal_content);

    activeItemOnScroll(sidebarItems, contentSections, {
      root: modal_content,
      rootMargin: "0px",
      threshold: [0]
    });
  }, []);

  function changeTheme(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.currentTarget.value as "light" | "dark";

    setConfig({
      theme: value
    });
  };

  return(
    <>
      <ModalTemplate
        title="Configuração"
        width="clamp(25em, 80vw,70em)"
        height="90vh"
        functionToCloseTheModel={closeFunc}>

        <Sidebar
          width={sidebar.w}
          items={
            [
              {
                item: "Editor",
                goTo: "#editor-configuration"
              }
            ]
          }
          >
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
