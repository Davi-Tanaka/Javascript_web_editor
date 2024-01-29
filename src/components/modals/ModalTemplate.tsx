import React from "react";
import { MouseEventHandler } from "react";
import { FlexDirection } from "@interfaces/Styles";

import "@styles/components/modals/Modal.scss";

interface ModalProps {
  functionToCloseTheModel: MouseEventHandler,
  title: string,
  children?: React.ReactNode
};

function Modal(prop : ModalProps) {
  return(
    <>
      <form 
          action=""         method="post" 
          className="modal" onSubmit={e => e.preventDefault()}>

        <button  className="close_screen_button" id="close_configuratiSon_screen_button" 
          title="close screen"
          onClick={ prop.functionToCloseTheModel }>

          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="title-container">
          <h5 className="title">{ prop.title }</h5>
        </div>
  
        <div 
          className="content-container">
          { prop.children }
        </div>
      </form>
    </>
  )
}

export default Modal;