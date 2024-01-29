import "@styles/pages/index/index.scss";

import { useState, useCallback, useEffect } from "react";

import BluredBackground from "@components/BluredBackground";
import ConfigModal from "@components/modals/Config";
import HelpModal from "@components/modals/Help";

import ButtonsHeader from "@components/editor/ButtonsHeaders"
import Editor from "@components/editor/Editor"
import EditorOutput from "@components/editor/Output"
import OutputLine from "@components/editor/OutputLine";

function App() {
  const [oldConsole, setOldConsole] = useState<Console>({
    ...console
  });
  
  const [outputArray, setOutputArrayValue] = useState<string[]>([]);
  const [ screensStatus, setScreenStatus ] = useState({
    helpIsOpen: false,
    configIsOpen: false,
  });
    
  console.log = useCallback((value) => {
    return value;
  }, [])

  console.error = useCallback((value) => {
    return value;
  }, []);

  const buttonsHeaderCommand = {
    run: (event) => {
      const editorTextValue =  document.querySelector("#CodeMirrorEditor").ariaValueText;
      const codeResult = eval(editorTextValue);

      switch(typeof codeResult) {
        case "object": 
          setOutputArrayValue([...outputArray, JSON.stringify(codeResult) ]);

          break;

        default:
          setOutputArrayValue([...outputArray, codeResult]);

          break;
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

      { screensStatus.configIsOpen 
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
      
      <EditorOutput>
        { 
          outputArray.map((value, index) => <OutputLine value={value} key={index}/>) 
        }
      </EditorOutput>
    </div>
    </>
  );
}

export default App;
