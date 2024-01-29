import "@styles/components/editor/Output.scss"

import { useRef, useEffect } from "react";

function EditorOutput({ children }) {
  const output_section = useRef(null);

  useEffect(() => {
    (output_section.current as HTMLElement).scrollTo({
      behavior: "smooth",
      top: (output_section.current as HTMLElement).scrollHeight
    });
    
  }, [children]);

  return(
    <>
      <div id="output_section" ref={output_section}>
        <div className="header">
          <h3 className="title">Console</h3>
        </div>

        { children }
      </div>
    </>
  )
}

export default EditorOutput;