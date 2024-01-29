import { useMemo, memo} from "react";

interface OutputLineProps {
  value: string,
}

function OutputLine({ value }: OutputLineProps) {
  const settedDate = useMemo(() =>  new Date().toLocaleTimeString(), []);

  return(
    <>
      <div className="result_line">
        <span className="result_time">{ settedDate }</span>
        <code className="output_value">
          <pre>
            { value }
          </pre>
        </code>
      </div>
    </>
  )
}

export default memo(OutputLine);