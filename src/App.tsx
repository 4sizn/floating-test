import { useEffect, useState } from "react";
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
      {withFloating(
        () => {
          return (
            <div style={{ backgroundColor: "red", width: "100px" }}>
              this is div 123123d
            </div>
          );
        },
        {
          barComponent: () => {
            return <div>bar</div>;
          },
        }
      )}
      {withFloating(() => (
        <button>asdfasdf</button>
      ))}

      {withFloating(() => (
        <div>MiniChat</div>
      ))}

      {withFloating(
        () => (
          <div>
            <MiniChat />
          </div>
        ),
        {
          barComponent: () => {
            return (
              <div
                css={{
                  position: "absolute",
                  width: "100%",
                  backgroundColor: "purple",
                  zIndex: 1,
                  opacity: 0.5,
                }}
              >
                bar
              </div>
            );
          },
        }
      )}
    </>
  );
}
