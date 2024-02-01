import ModalTemplate from "@components/modals/ModalTemplate";
import Sidebar from "@components/navigation/Sidebar";
import Item from "@components/navigation/Item";

import styles from "@styles/components/modals/ModalContent.module.scss";
import tableStyles from "@styles/components/CombinationTable.module.scss"

import colors from "@styles/utils/_colors.module.scss";

import { useCallback, useMemo, Fragment } from "react";

interface HelpContent {
  title: string,
  content: string
};

function HelpModal({ closeFunc }) {
  const values = [
    {
      title: "Combinações de teclas.",
      content: (
        <Fragment>
          <table className={tableStyles.table}>
            <tr>
              <th>Combinação</th>
              <th>Ação</th>
            </tr>
            <tr>
              <td>Escape</td>
              <td>Fecha todos os modals e popup.</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
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
      >
          {
            values.map(value => <Item value={value.title} goTo={formatElementId(value.title)}/>)
          }
      </Sidebar>

      <div
        className={styles.modal_content}
        style={{
          width: `calc(100% - ${navbar.w})`
        }}
      >
          {
            values.map(value => {
              return(
                <>
                  <div className={styles.modal_section}>
                    <div className={styles.wrapper_title} id={formatElementId(value.title)}>
                        <h5 className={styles.title}>{ value.title }</h5>
                    </div>
                    <div className={styles.section_content} id="autor_help_modal">
                      <p className={styles.paragraph}>
                        { value.content }
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