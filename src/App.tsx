import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { MiniChat } from "./MiniChat";
import { FloatingProvider, withAddFloating } from "./Floating";

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
      {/* {withAddFloating(
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
          resize: true,
        }
      )}
      {withAddFloating(() => (
        <button>asdfasdf</button>
      ))}

      {withAddFloating(() => (
        <div>MiniChat</div>
      ))} */}

      {withAddFloating(
        () => (
          <div>
            <MiniChat />
          </div>
        ),
        {
          barComponent: (props) => {
            return (
              <div
                css={{
                  position: "absolute",
                  width: "70%",
                  backgroundColor: "black",
                  zIndex: 1,
                  opacity: 0.5,
                }}
                {...props}
              >
                bar
              </div>
            );
          },
          resize: true,
        }
      )}
    </>
  );
}
