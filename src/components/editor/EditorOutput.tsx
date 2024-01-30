import "@styles/components/editor/Output.scss"

import { useRef, useEffect, useState, Children, ReactNode, useMemo, useCallback, memo} from "react";

interface EditorOutputProps {
  children: ReactNode | ReactNode[],
  clearOutputLines?: boolean
}

function EditorOutput({ children, clearOutputLines }: EditorOutputProps) {
  const output_section = useRef(null);
  
  const clearChildren = useCallback(() => {
    const resultLines = document.querySelectorAll("#output_section .result_line");

    resultLines.forEach((elem, index) => {
      
      const animation = 300;
      var removeClassAfter = animation/6 * index;

      const setRemoveClass = setTimeout(() => {
        elem.classList.add("removing-animation");
      }, removeClassAfter)


      const removeChild = setTimeout(() => {
        elem?.remove();
      }, (removeClassAfter + 100) * resultLines.length);
    })
  }, []);

  useEffect(() => {
    (output_section.current as HTMLElement).scrollTo({
      behavior: "smooth",
      top: (output_section.current as HTMLElement).scrollHeight
    });
    
  }, [children]);

  useEffect(() => {
    if(clearOutputLines) {
      clearChildren();
    };

  }, [clearOutputLines])

  return(
    <>
      <div id="output_section" ref={output_section}>
        <div className="header">
          <h3 className="title">Console</h3>
        </div>
          { 
            children
          }
      </div>
    </>
  )
}

export default memo(EditorOutput);