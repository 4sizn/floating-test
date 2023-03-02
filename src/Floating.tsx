import React, { useContext, useEffect, useReducer, useState } from "react";
import ReactDOM from "react-dom";
import "./App.css";

export type PayloadAction<
  P = void,
  T extends string = string,
  M = never,
  E = never
> = {
  payload: P;
  type: T;
} & ([M] extends [never]
  ? {}
  : {
      meta: M;
    }) &
  ([E] extends [never]
    ? {}
    : {
        error: E;
      });

type FloatingStateContextType = {
  state: FloatingState;
  dispatch: React.Dispatch<
    | PayloadAction<FloatingItemState, "add">
    | PayloadAction<{ id: string }, "front">
  >;
};

const FloatingStateContext =
  React.createContext<FloatingStateContextType | null>(null);

type FloatingItemOptions = {
  resize?: boolean;
  barComponent?: (props: any) => React.ReactNode;
  x?: number;
  y?: number;
  z?: number;
};

type FloatingItemState = {
  id: string;
  render: (props?: any) => React.ReactNode;
  options: FloatingItemOptions;
};

type FloatingState = {
  item: Record<string, FloatingItemState>;
  data: {
    hz: number;
  };
};

const initialState = {
  item: {},
  data: {
    hz: 0,
  },
};

function reducer(
  state: FloatingState = initialState,
  action: PayloadAction<FloatingItemState>
) {
  console.log("###reducer", action);
  switch (action.type) {
    case "add": {
      state = {
        ...state,
        item: {
          ...state.item,
          [action.payload.id]: action.payload,
        },
      };

      break;
    }
    case "remove": {
      break;
    }
    case "resize": {
      if (state.item[action.payload.id]?.options?.z !== state.data.hz) {
        state.data.hz = state.data.hz + 1;
      }

      state = {
        ...state,
        item: {
          ...state.item,
          [action.payload.id]: {
            ...state.item[action.payload.id],
            options: {
              ...state.item[action.payload.id].options,
              z: state.data.hz,
            },
          },
        },
      };

      break;
    }
    case "front": {
      if (state.item[action.payload.id].options.z !== state.data.hz) {
        state.data.hz = state.data.hz + 1;
      }

      state = {
        ...state,
        item: {
          ...state.item,
          [action.payload.id]: {
            ...state.item[action.payload.id],
            options: {
              ...state.item[action.payload.id].options,
              z: state.data.hz,
            },
          },
        },
      };
      break;
    }
    default: {
      break;
    }
  }

  console.log("###state", state);
  console.log("###current Zindex", state.data.hz);

  return state;
}

export function FloatingProvider({ children }: { children?: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FloatingStateContext.Provider value={{ state, dispatch }}>
      <>{children}</>
      <>
        {ReactDOM.createPortal(
          Object.entries(state.item).map(([key, item]) => {
            return (
              <Floating key={key} name={String(key)}>
                {(props) => {
                  console.log("props", props);
                  return (
                    <>
                      {item.options.barComponent &&
                        item.options.barComponent({
                          ...props,
                          ["data-op"]: "0",
                        })}
                      {item.options.resize && (
                        <>
                          <div className="resizecont topone">
                            <div className="flex">
                              <div
                                className="cursor-nw-resize"
                                data-op="1"
                                data-vec="-1,-1"
                                onMouseDown={props.onMouseDown}
                                css={{
                                  width: "8px",
                                  height: "8px",
                                }}
                              ></div>
                              <div
                                className="cursor-row-resize"
                                data-op="1"
                                data-vec="-1,0"
                                onMouseDown={props.onMouseDown}
                                css={{
                                  width: "100%",
                                  minWidth: "8px",
                                  minHeight: "8px",
                                }}
                              ></div>
                              <div
                                className="cursor-sw-resize"
                                data-op="1"
                                data-vec="-1,1"
                                onMouseDown={props.onMouseDown}
                                css={{
                                  width: "8px",
                                  height: "8px",
                                }}
                              ></div>
                            </div>
                          </div>
                          <div className="resizecont leftone">
                            <div className="h-full">
                              <div
                                className="cursor-col-resize"
                                data-op="1"
                                data-vec="0,-1"
                                onMouseDown={props.onMouseDown}
                                css={{
                                  height: "100%",
                                  minWidth: "8px",
                                  minHeight: "8px",
                                }}
                              />
                            </div>
                          </div>
                          <div className="resizecont rightone">
                            <div className="h-full">
                              <div
                                className="cursor-col-resize"
                                data-op="1"
                                data-vec="0,1"
                                onMouseDown={props.onMouseDown}
                                css={{
                                  height: "100%",
                                  minWidth: "8px",
                                  minHeight: "8px",
                                }}
                              ></div>
                            </div>
                          </div>
                          <div className="resizecont bottomone">
                            <div className="flex">
                              <div
                                className="cursor-nesw-resize"
                                data-op="1"
                                data-vec="1,-1"
                                onMouseDown={props.onMouseDown}
                                css={{
                                  width: "8px",
                                  height: "8px",
                                }}
                              ></div>
                              <div
                                className="cursor-row-resize"
                                data-op="1"
                                data-vec="1,0"
                                onMouseDown={props.onMouseDown}
                                css={{
                                  width: "100%",
                                  minWidth: "8px",
                                  minHeight: "8px",
                                }}
                              ></div>
                              <div
                                className="cursor-nwse-resize"
                                data-op="1"
                                data-vec="1,1"
                                onMouseDown={props.onMouseDown}
                                css={{
                                  width: "8px",
                                  height: "8px",
                                }}
                              ></div>
                            </div>
                          </div>
                        </>
                      )}
                      {item.render()}
                    </>
                  );
                }}
              </Floating>
            );
          }),
          document.body
        )}
      </>
    </FloatingStateContext.Provider>
  );
}

export function Floating({
  children,
  ...props
}: React.PropsWithChildren<{
  name: string;
  className?: string;
  style?: React.CSSProperties;
}>) {
  var posP = [0, 0],
    //마우스 좌표
    posM = [0, 0];
  // 노드 타겟
  let wnapp: HTMLElement | null = null;
  // resize용 drag용 구분자
  let op = 0;
  let dimP = [0, 0];
  let vec = [0, 0];

  const [snap, setSnap] = useState(false);
  const context = useContext(FloatingStateContext);

  const setPos = (pos0: number, pos1: number) => {
    if (wnapp) {
      wnapp.style.top = pos0 + "px";
      wnapp.style.left = pos1 + "px";
    }
  };

  const setDim = (dim0: number, dim1: number) => {
    if (wnapp) {
      wnapp.style.height = dim0 + "px";
      wnapp.style.width = dim1 + "px";
    }
  };

  const closeDrag: typeof document.onmouseup = () => {
    document.onmouseup = null;
    document.onmousemove = null;

    wnapp?.classList.remove("notrans");
    wnapp?.classList.remove("z9900");

    if (context) {
      context.dispatch({
        type: "resize",
        payload: {
          id: props.name,
        },
      });
    }
  };

  const eleDrag: typeof document.onmousemove = (e) => {
    e = e || window.event;
    e.preventDefault();

    var pos0 = posP[0] + e.clientY - posM[0],
      pos1 = posP[1] + e.clientX - posM[1],
      dim0 = dimP[0] + vec[0] * (e.clientY - posM[0]),
      dim1 = dimP[1] + vec[1] * (e.clientX - posM[1]);

    console.log("###", dim0, dim1);
    console.log("###eleDrag");
    if (op == 0) setPos(pos0, pos1);
    else {
      dim0 = Math.max(dim0, 300);
      dim1 = Math.max(dim1, 300);
      pos0 = posP[0] + Math.min(vec[0], 0) * (dim0 - dimP[0]);
      pos1 = posP[1] + Math.min(vec[1], 0) * (dim1 - dimP[1]);
      setPos(pos0, pos1);
      setDim(dim0, dim1);
    }
  };

  const openSnap = () => {
    setSnap(true);
    console.log("openSnap", snap);
  };

  const closeSnap = () => {
    setSnap(false);
    console.log("closeSnap", snap);
  };

  const toolClick = () => {
    if (context) {
      context.dispatch({
        type: "front",
        payload: {
          id: props.name,
        },
      });
    }

    console.log("toolClick", props);
  };

  const toolDrag: React.MouseEventHandler<HTMLDivElement> = (e) => {
    console.log("eee toolDrag", e);

    e = e || window.event;
    e.preventDefault();
    posM = [e.clientY, e.clientX];
    op = Number(e.currentTarget.dataset.op);

    if (op === 0) {
      wnapp = e.currentTarget.parentElement as HTMLElement;
    } else {
      vec = e.currentTarget.dataset.vec!.split(",").map((v) => Number(v));
      wnapp = e.currentTarget.parentElement?.parentElement
        ?.parentElement as HTMLElement;
    }

    if (wnapp) {
      wnapp.classList.add("notrans");
      wnapp.classList.add("z9900");
      posP = [wnapp.offsetTop, wnapp.offsetLeft];
      dimP = [
        parseFloat(getComputedStyle(wnapp).height.replaceAll("px", "")),
        parseFloat(getComputedStyle(wnapp).width.replaceAll("px", "")),
      ];
    }

    document.onmouseup = closeDrag;
    document.onmousemove = eleDrag;

    console.log("toolDrag", posM, wnapp);
  };

  return (
    <div
      className="floatTab"
      style={{
        zIndex: context?.state.item[props.name].options.z,
        left: context?.state.item[props.name].options.x,
        top: context?.state.item[props.name].options.y,
      }}
    >
      {children({
        ...props,
        onClick: toolClick,
        onMouseDown: toolDrag,
        onMouseOver: openSnap,
        onMouseLeave: closeSnap,
      })}
    </div>
  );
}

export function withAddFloating(
  Component: React.FC,
  options: FloatingItemOptions = {}
) {
  const context = useContext(FloatingStateContext)!;

  useEffect(() => {
    if (context) {
      context.dispatch({
        type: "add",
        payload: {
          id: String(Math.random()),
          render: Component,
          options,
        },
      });
    }
  }, []);

  return null;
}
