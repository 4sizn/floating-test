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
      {/* {withAddFloating(
        (props) => {
          console.log("props2", props);
          return (
            <MiniChat
              style={{
                backgroundColor: "red",
              }}
              {...props}
            />
          );
        },
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
          position: () => {
            return {
              // x: 0,
              // y: 0,
              // right: 0,
              // top: 0,
              // left: 0,
              // bottom: 0,
              right: 0,
              top: 0,
              // bottom: 15,
              // right: 155,
            };
          },
        }
      )} */}
      {/* {withAddFloating(
        (props) => (
          <MiniChat
            style={{
              backgroundColor: "blue",
            }}
            {...props}
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
      )} */}
      {withAddFloating(
        (props) => (
          <MiniChat
            style={{
              backgroundColor: "grey",
            }}
            {...props}
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
          position: (el) => {
            return calEdgePosition(el, "sw");
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
          position: (el) => {
            return calEdgePosition(el, "se");
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
          position: (el) => {
            return calEdgePosition(el, "ne");
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
          position: (el) => {
            return {
              right: 15,
              bottom: 20,
            };
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
