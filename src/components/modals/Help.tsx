import ModalTemplate from "@components/modals/ModalTemplate";
import Sidebar from "@components/navigation/Sidebar";
import Item from "@components/navigation/Item";
import { useCallback, useMemo } from "react";

interface HelpContent {
  title: string,
  content: string
};

function HelpModal({ closeFunc }) {
  const values = [
    {
      title: "Como contribuir ?",
      content: "Abra um issue ou copie o <a href='https://github.com/Davi-Tanaka/Javascript_web_editor'>projeto</a> para seu github e faça um PR com suas melhorias."
    }
  ]

  const formatElementId = useCallback((str: string) =>  {
    const finalValue = str.trim().toLowerCase().replace(" ", "-");

    return finalValue;
  }, []);

  return(
    <>
      <ModalTemplate
        title="Ajuda"
        functionToCloseTheModel={closeFunc}
      >
      <Sidebar
        width="10em"
        >
          {
            values.map(value => <Item value={value.title} goTo={formatElementId(value.title)}/>)
          }
      </Sidebar>

      <div className="modal-content">
          {
            values.map(value => {
              return(
                <>
                  <div className="modal-section">
                    <div className="wrapper-title" id={formatElementId(value.title)}>
                        <h5>{ value.title }</h5>
                    </div>
                    <div className="section-content" id="autor_help_modal">
                      <p>
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