import "@styles/components/editor/Output.scss"

import { useRef, useEffect, useMemo, useCallback, memo, useContext, useState} from "react";

import { ConfigContext } from "@/context/ConfigContext"
import { OutputObject } from "@/interfaces/EditorOutput/OutputObject";

interface EditorOutputProps {
  outputArr: any[],
  clearOutputLines?: boolean,
}

function EditorOutput({ outputArr, clearOutputLines }: EditorOutputProps) {
  const output_lines = useRef(null);

  const [config, setConfig] = useContext(ConfigContext);
  const [outputArray, setOutputArray] = outputArr;

  const settedDate = useMemo(() =>  new Date().toLocaleTimeString(), []);
  const [childrenAreCleaned, setChildrenAreCleaned] = useState(false);

  const clearChildren = useCallback(() => {
    const resultLines = document.querySelectorAll("#output_section .result_line");

    let timeouts = {
      removeClass: null,
      removeChild: null,
      clearChildren: null
    };

    let duration = {
      animation: 300,
      removeAfter: (index) => duration.animation/4 * index
    }

    resultLines.forEach((elem, index) => {
      timeouts.removeClass = setTimeout(() => {
        elem.classList.add("removing-animation");
      },duration.removeAfter(index))
    })

    timeouts.clearChildren = setTimeout(() => {
      setChildrenAreCleaned(true);
    }, duration.removeAfter(resultLines.length) + 250);
  }, []);

  useEffect(() => {
    (output_lines.current as HTMLElement).scrollTo({
      behavior: "smooth",
      top: (output_lines.current as HTMLElement).scrollHeight
    });
    
  }, [outputArray]);

  useEffect(() => {
    if(clearOutputLines) {
      clearChildren();
    };
  }, [clearOutputLines])

  useEffect(() => {
    if(childrenAreCleaned == true) {
      setOutputArray([]);

      setChildrenAreCleaned(false)
    }
  }, [childrenAreCleaned])

  return(
    <>
      <div 
        id="output_section" 
        className={
        config.theme == "dark" ? "theme-dark" : "output_section"
      }>
      
        <div className="header">
          <h3 className="title">Console</h3>
        </div>

        <div className="output_lines" ref={output_lines}
>
          { 
            outputArray.map(value => {
              return(
                <div className={
                  value.type == 'error' ? 'result_line error' : 'result_line'
                }>
                  <span className="result_time">{ settedDate }</span>
                  <code className="output_value">
                    <pre>
                      { value.result }
                    </pre>
                  </code>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default memo(EditorOutput);