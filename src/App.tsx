import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { MiniChat } from "./MiniChat";
import { FloatingProvider } from "./Floating";

function App() {
  return (
    <div className="App">
      <FloatingProvider>
        <div
          style={{
            display: "flex",
          }}
        >
          <MiniChat />
          <MiniChat />
          <MiniChat />
          <MiniChat />
        </div>
      </FloatingProvider>
    </div>
  );
}

export default App;
