import { useMemo, memo} from "react";

import { OutputObject } from "@/interfaces/EditorOutput/OutputObject";

interface OutputLineProps {
  value: OutputObject
}

function OutputLine({ value }: OutputLineProps) {
  const settedDate = useMemo(() =>  new Date().toLocaleTimeString(), []);
  const result_line_classname = `result_line ${value.type == 'error' ? 'error' : '' }`;

  return(
    <>
      <div className={result_line_classname}>
        <span className="result_time">{ settedDate }</span>
        <code className="output_value">
          <pre>
            { value.result }
          </pre>
        </code>
      </div>
    </>
  )
}

export default memo(OutputLine);