import React, { useContext, useEffect, useReducer, useState } from "react";
import ReactDOM from "react-dom";

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

const FloatingStateContext = React.createContext<{} | null>(null);
function reducer(
  state = {
    items: {},
    item2: [],
  },
  action: PayloadAction<{}>
) {
  switch (action.type) {
    case "add": {
      state = {
        ...state,
        items: {
          ...state.items,
          //   ...action.payload.component,
        },
        item2: [...state.item2, action.payload.component],
      };

      break;
    }
    case "remove": {
      break;
    }
    case "front": {
      break;
    }
    default: {
      break;
    }
  }

  return state;
}

const initialState = {
  items: {
    0: {
      render: function (props) {
        return (
          <div style={{ backgroundColor: "red", width: "100px" }} {...props}>
            this is div 123123
          </div>
        );
      },
    },
    1: {
      render: function (props) {
        return (
          <div style={{ backgroundColor: "blue", width: "100px" }} {...props}>
            this is div 123123
          </div>
        );
      },
    },
    2: {
      render: function (props) {
        return (
          <div style={{ backgroundColor: "green", width: "100px" }} {...props}>
            this is div 123123
          </div>
        );
      },
    },
  },
  item2: [
    (props) => (
      <div style={{ backgroundColor: "green", width: "100px" }} {...props}>
        this is div 123123
      </div>
    ),
  ],
};

export function FloatingProvider({ children }: { children?: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FloatingStateContext.Provider value={{ state, dispatch }}>
      <>{children}</>
      <>
        {ReactDOM.createPortal(
          state.item2.map((render, key) => {
            return (
              <Floating className="floatTab" key={key} name={String(key)}>
                {render()}
              </Floating>
            );
          }),
          document.body
        )}
      </>
    </FloatingStateContext.Provider>
  );
}

export function Floating(props: { children: React.ReactNode; name: string }) {
  var posP = [0, 0],
    //마우스 좌표
    posM = [0, 0];
  // 노드 타겟
  let wnapp: HTMLElement | null = null;
  // child 노드 구분자

  const [snap, setSnap] = useState(false);
  const { state, dispatch } = useContext(FloatingStateContext);

  const setPos = (pos0: number, pos1: number) => {
    if (wnapp) {
      wnapp.style.top = pos0 + "px";
      wnapp.style.left = pos1 + "px";
    }
  };

  const closeDrag: typeof document.onmouseup = () => {
    document.onmouseup = null;
    document.onmousemove = null;

    wnapp?.classList.remove("notrans");
    wnapp?.classList.remove("z9900");
  };

  const eleDrag: typeof document.onmousemove = (e) => {
    e = e || window.event;
    e.preventDefault();

    var pos0 = posP[0] + e.clientY - posM[0],
      pos1 = posP[1] + e.clientX - posM[1];
    setPos(pos0, pos1);
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
    dispatch({
      type: "front",
      payload: {
        name: props.name,
      },
    });
    console.log("toolClick", props);
  };

  const toolDrag: typeof document.onmousedown = (e) => {
    e = e || window.event;
    e.preventDefault();
    posM = [e.clientY, e.clientX];
    wnapp = e.currentTarget as HTMLElement;

    if (wnapp) {
      wnapp.classList.add("notrans");
      wnapp.classList.add("z9900");
      posP = [wnapp.offsetTop, wnapp.offsetLeft];
    }

    document.onmouseup = closeDrag;
    document.onmousemove = eleDrag;

    console.log("toolDrag", posM, wnapp);
  };

  return (
    <div
      style={{
        ...props.style,
      }}
      onClick={toolClick}
      onMouseDown={toolDrag}
      onMouseOver={openSnap}
      onMouseLeave={closeSnap}
      {...props}
    />
  );
}

export function withFloating(Component: React.FC, options = {}) {
  const { state, dispatch } = useContext(FloatingStateContext);

  useEffect(() => {
    console.log("hsshin asdf");
    dispatch({
      type: "add",
      payload: {
        component: Component,
        options,
      },
    });
  }, []);

  return null;
}
