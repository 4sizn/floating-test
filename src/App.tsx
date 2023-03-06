import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
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
          <MiniChat
            style={{
              backgroundColor: "red",
            }}
          />
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

      {withAddFloating(
        () => (
          <MiniChat
            style={{
              backgroundColor: "blue",
            }}
          />
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
      {withAddFloating(
        () => (
          <MiniChat
            style={{
              backgroundColor: "grey",
            }}
          />
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

function calSeEdgePosition(element: HTMLElement) {
  const x = window.innerWidth - 300;
  const y = window.innerHeight - 639;

  return {
    x,
    y,
  };
}

function calSeEdgePosition2(element: HTMLElement) {
  const x = window.innerWidth - 300;
  const y = window.innerHeight - 639;

  return {
    x,
    y,
  };
}
