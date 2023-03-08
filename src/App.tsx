import { MiniChat } from "./MiniChat";
import { FloatingProvider, withAddFloating } from "./Floating";
import { calEdgePosition } from "./util";

function App() {
  return (
    <div className="App">
      <FloatingProvider>
        <SubApp />
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
