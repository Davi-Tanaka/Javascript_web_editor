import React, { useEffect, useRef } from "react";
import { MouseEventHandler } from "react";
import { FlexDirection } from "@interfaces/Styles";

import "@styles/components/modals/Modal.scss";

import { useRippleEffect } from "@/hooks/useRippleEffect";

interface ModalProps {
  functionToCloseTheModel: MouseEventHandler,
  title: string,
  children?: React.ReactNode,
  width?: string,
  height?: string
};

function Modal(prop : ModalProps) {
  const closeButton = useRef(null);

  useEffect(() => {
    var Ripple = useRippleEffect;
    var btn =  closeButton.current as HTMLButtonElement;

    btn.addEventListener("click", (e) => Ripple(e, 1000))
  }, []);
  return(
    <>
      <form 
          action=""         method="post" 
          className="modal" onSubmit={e => e.preventDefault()}
          
          style={{
            width: prop.width,
            height: prop.height
          }}
          >

        <button ref={closeButton} className="close_screen_button" 
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