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
          position: (ref) => {
            return {
              x: 15,
              y: 155,
            };
          },
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
          position: (ref) => {
            return calEdgePosition(ref, "sw");
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
          position: (ref) => {
            return calEdgePosition(ref, "se");
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
          position: (ref) => {
            return calEdgePosition(ref, "ne");
          },
          resize: true,
        }
      )}
    </>
  );
}

function calEdgePosition(
  element: HTMLElement,
  type: "se" | "sw" | "ne" | "nw"
) {
  switch (type) {
    case "se":
      return calSeEdgePosition(element);
    case "sw":
      return calSwEdgePosition(element);
    case "ne":
      return calNeEdgePosition(element);
    case "nw":
      return calNwEdgePosition();
  }

  function calSeEdgePosition(element: HTMLElement) {
    const x = window.innerWidth - element.clientWidth - 8;
    const y = window.innerHeight - element.clientHeight - 8;

    return {
      x,
      y,
    };
  }

  function calSwEdgePosition(element: HTMLElement) {
    const x = 8;
    const y = window.innerHeight - element.clientHeight - 8;

    return {
      x,
      y,
    };
  }

  function calNeEdgePosition(element: HTMLElement) {
    const x = window.innerWidth - element.clientWidth - 8;
    const y = 8;

    return {
      x,
      y,
    };
  }

  function calNwEdgePosition() {
    const x = 8;
    const y = 8;
    return {
      x,
      y,
    };
  }
}
