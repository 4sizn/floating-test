import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { MiniChat } from "./MiniChat";
import { FloatingProvider, withFloating } from "./Floating";

function App() {
  return (
    <div className="App">
      <FloatingProvider>
        <div
          style={{
            display: "flex",
          }}
        >
          <SubApp />
        </div>
      </FloatingProvider>
    </div>
  );
}

export default App;

function SubApp() {
  return (
    <>
      {withFloating((props) => {
        return (
          <div style={{ backgroundColor: "red", width: "100px" }} {...props}>
            this is div 123123d
          </div>
        );
      })}
      {withFloating(() => (
        <button>asdfasdf</button>
      ))}

      {withFloating(() => (
        <div>MiniChat</div>
      ))}

      {withFloating(() => (
        <div>
          <MiniChat />
        </div>
      ))}
    </>
  );
}
