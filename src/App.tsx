import "@styles/pages/index/index.scss";

import { useState, useCallback, useEffect, useContext } from "react";

import BluredBackground from "@components/BluredBackground";
import ConfigModal from "@components/modals/Config";
import HelpModal from "@components/modals/Help";

import ButtonsHeader from "@components/editor/ButtonsHeaders"
import Editor from "@components/editor/Editor"
import EditorOutput from "@/components/editor/EditorOutput"

import { OutputObject } from "@interfaces/EditorOutput/OutputObject";

import { ConfigContext } from "@context/ConfigContext";

function App() {
  const [config, setConfig] = useContext(ConfigContext);

  const [ oldConsole, setOldConsole ] = useState({ ...console});
  const [outputArray, setOutputArrayValue] = useState<OutputObject[]>([{
    type: "log",
    result: "Bem vindo :D"
  }]);
  
  useEffect(()=> {
    var media = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (media) {
      setConfig({
        theme: "dark"
      })
    }
  }, [])

  const [ screensStatus, setScreenStatus ] = useState({
    helpIsOpen: false,
    configIsOpen: false,
  });

  const [ clearOutputLines, shouldClearOutputLines ] = useState(false);
    
  console.log = function(value) {
    oldConsole.log(value);

    return value;
  };

  console.clear = useCallback(() => {
    oldConsole.clear();

    shouldClearOutputLines(true);
  
    setTimeout(async () => {
      shouldClearOutputLines(false);
    }, 10)
  },[]);

  console.error = (error) => {
    oldConsole.error(error);

    setOutputArrayValue([...outputArray, {
      type: "error",
      result: error
    }]);
  }

  const buttonsHeaderCommand = {
    run: (event) => {
      const editorTextValue =  document.querySelector("#CodeMirrorEditor").ariaValueText;

      try {
        const codeResult = eval(editorTextValue);
        const resultType = typeof codeResult;

        if(resultType != "undefined") {
          if(resultType == "object") {
            setOutputArrayValue([...outputArray, {
              type: "log",
              result: codeResult
            } ]);
          }
    
          if(resultType == "boolean") {
            setOutputArrayValue([...outputArray, {
              type: "log",
              result: (codeResult as boolean).toString()
            }]);
          }
    
          if(resultType == "function") {
            setOutputArrayValue([...outputArray, {
              type: "log",
              result: (codeResult as Function)()
            }]);
          }
    
          if(resultType != "object" && resultType != "boolean" && resultType != "function") {
            setOutputArrayValue([...outputArray, {
              type: "log",
              result: codeResult
            }]);
          }
        }
      } catch(err) {
        console.error(`Error: ${err.message};`);
      }
    },

    config: (event)=> {
      setScreenStatus({
        ...screensStatus,
        configIsOpen: !screensStatus.configIsOpen
      });
    },

    help: (event) => {
      setScreenStatus({
        ...screensStatus,
        helpIsOpen: !screensStatus.helpIsOpen
      });
    },

    clear: (event) => {
      console.clear();
    }
  };

  const keyboardCommands = useCallback((keyEvent: KeyboardEvent) => {
    var key = keyEvent.key;

    switch(key) {
      case "Escape":
        setScreenStatus({
          helpIsOpen: false,
          configIsOpen: false,
        })

      break;
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", keyboardCommands);
    buttonsHeaderCommand.run(null);
  }, [])

  return(
    <>
      <div id="root">
        { 
          screensStatus.configIsOpen 
            && 
          <BluredBackground>
            <ConfigModal closeFunc={buttonsHeaderCommand.config}/>
          </BluredBackground>
        }
        { 
          screensStatus.helpIsOpen
            && 
          <BluredBackground>
            <HelpModal closeFunc={buttonsHeaderCommand.help}/>
          </BluredBackground>
        }

        <div id="editor_container">
          <ButtonsHeader commandFunctions={ buttonsHeaderCommand }/>
          <Editor/>
        </div>
        
        <EditorOutput 
          clearOutputLines={clearOutputLines} 
          outputArr={[outputArray, setOutputArrayValue]}
        />
      </div>
    </>
  );
}

export default App;
