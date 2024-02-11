import { useCallback, useMemo, Fragment, useContext, useEffect } from "react";

import ModalTemplate from "@components/modals/ModalTemplate";
import Sidebar from "@components/navigation/Sidebar";

import styles from "@styles/components/modals/ModalContent.module.scss";
import tableStyles from "@styles/components/CombinationTable.module.scss"

import { ConfigContext } from "@/context/ConfigContext";
import { activeItemOnScroll } from "@/reusables/activeItemOnScroll";

import { formatID } from "@/reusables/formatID";

interface HelpContent {
  title: string,
  content: string
};

function HelpModal({ closeFunc }) {
  const  [ config, setConfig ] = useContext(ConfigContext);

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

  var navbar = {
    w: "10em"
  }
  
  return(
    <>
      <ModalTemplate
        title="Ajuda"
        functionToCloseTheModel={closeFunc}
        width="clamp(30em, 80vw, 80em)"
        height="90vh"
      >
      <Sidebar
        width={navbar.w}
        items={
          sidebarItems.map(item => {
            return {
              item: item.title,
              goTo: "#" + formatID(item.title)
            }
          })
        }
      />

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
                  <div className={styles.modal_section} id={formatID(item.title)}>
                    <div className={styles.wrapper_title}>
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