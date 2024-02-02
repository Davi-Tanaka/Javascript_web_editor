import { useCallback, useMemo, Fragment, useContext } from "react";


import ModalTemplate from "@components/modals/ModalTemplate";
import Sidebar from "@components/navigation/Sidebar";

import styles from "@styles/components/modals/ModalContent.module.scss";
import tableStyles from "@styles/components/CombinationTable.module.scss"

import { ConfigContext } from "@/context/ConfigContext";

interface HelpContent {
  title: string,
  content: string
};

function HelpModal({ closeFunc }) {
  const  [ config, setConfig ] = useContext(ConfigContext);

  const sidebarItems = [
    {
      title: "Combinações de teclas.",
      content: (
        <Fragment>
          <table className={
            config.theme == "dark" 
              ?
                tableStyles.table + " " + tableStyles.theme_dark
              :
                tableStyles.table
            }>
            <tr>
              <th>Combinação</th>
              <th>Ação</th>
            </tr>
            <tr>
              <td>Escape</td>
              <td>Fecha todos os modals e popup.</td>
            </tr>
      
          </table>
        </Fragment>
      )
    }
  ]

  const formatElementId = useCallback((str: string) =>  {
    const finalValue = str.trim().toLowerCase().replace(/\s+/g, "-");
    return "#" + finalValue;
  }, []);

  var navbar = {
    w: "10em"
  }
  
  return(
    <>
      <ModalTemplate
        title="Ajuda"
        functionToCloseTheModel={closeFunc}
        width="clamp(30em, 80vw, 80em)"
      >
      <Sidebar
        width={navbar.w}
        items={
          sidebarItems.map(item => {
            return {
              item: item.title,
            }
          })
        }
      >
      </Sidebar>

      <div
        className={styles.modal_content}
        style={{
          width: `calc(100% - ${navbar.w})`
        }}
      >
          {
            sidebarItems.map(item => {
              return(
                <>
                  <div className={styles.modal_section}>
                    <div className={styles.wrapper_title} id={formatElementId(item.title)}>
                        <h5 className={styles.title}>{ item.title }</h5>
                    </div>
                    <div className={styles.section_content} id="autor_help_modal">
                      <p className={styles.paragraph}>
                        { item.content }
                      </p>
                    </div>
                  </div> 
                </>
              )
            })
          }
      </div>

      </ModalTemplate>
    </>
  )
}

export default HelpModal;