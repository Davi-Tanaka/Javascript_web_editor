import "@styles/components/editor/Editor.scss"

import CodeMirror from "@uiw/react-codemirror";
import { defaultSettingsMaterialLight, materialLightInit} from "@uiw/codemirror-theme-material";

import { javascript } from '@codemirror/lang-javascript';
import {  useState, useMemo, useCallback, memo } from "react";


function Editor() {
  const [editorValue, setEditorValue] = useState(null);

  const defaultEditorValue = useMemo(() => 
`function conseguirOQuadradoDeUmNumero(x) {
  return x * x
};

const quadradoDe9213 = conseguirOQuadradoDeUmNumero(9213);
console.log('O quadrado do número 9213 é:' + quadradoDe9213);`,[]);

  const storeEditorValorOnChange = useCallback((value, view) => {
    setEditorValue(value);
  }, []);

  return(
    <>
      <div className="editor">
        <code className="code_text_editor language-js">
          <CodeMirror 
            id="CodeMirrorEditor"
            theme={ 
              materialLightInit(
                { settings: defaultSettingsMaterialLight }
              ) 
            }

            indentWithTab={ true }
            extensions={[ 
              javascript({ typescript: false, jsx: false }) 
            ]}

            height="100vh"
            value={ defaultEditorValue }
            autoFocus
            aria-autocomplete="inline"
            aria-valuetext={ editorValue || defaultEditorValue }

            onChange={storeEditorValorOnChange}
          /> 
        </code>
      </div>
    </>
  )
}

export default memo(Editor);