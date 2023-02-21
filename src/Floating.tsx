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

type FloatingStateContextType = {
  state: FloatingState;
  dispatch: React.Dispatch<
    | PayloadAction<FloatingItemState, "add">
    | PayloadAction<{ name: string }, "front">
  >;
};

const FloatingStateContext =
  React.createContext<FloatingStateContextType | null>(null);

type FloatingItemOptions = {
  resize?: boolean;
  barComponent?: (props: any) => React.ReactNode;
};

type FloatingItemState = {
  id: string;
  render: (props?: any) => React.ReactNode;
  options: FloatingItemOptions;
};

type FloatingState = {
  item2: Record<string, FloatingItemState>;
  data: {
    hz: number;
  };
};

const initialState = {
  item2: {},
  data: {
    hz: 0,
  },
};

function reducer(
  state: FloatingState = initialState,
  action: PayloadAction<FloatingItemState>
) {
  switch (action.type) {
    case "add": {
      state = {
        ...state,
        item2: {
          ...state.item2,
          [action.payload.id]: action.payload,
        },
      };

      break;
    }
    case "remove": {
      break;
    }
    case "front": {
      console.log("front", action.payload);
      state = {
        ...state,
        item2: {
          ...state.item2,
          [action.payload.name]: {
            ...state.item2[action.payload.name],
          },
        },
        data: {
          hz: state.data.hz + 1,
        },
      };
      break;
    }
    default: {
      break;
    }
  }

  return state;
}

export function FloatingProvider({ children }: { children?: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FloatingStateContext.Provider value={{ state, dispatch }}>
      <>{children}</>
      <>
        {ReactDOM.createPortal(
          Object.entries(state.item2).map(([key, item]) => {
            return (
              <Floating className="floatTab" key={key} name={String(key)}>
                {item.options.barComponent && item.options.barComponent({})}
                {item.render()}
              </Floating>
            );
          }),
          document.body
        )}
      </>
    </FloatingStateContext.Provider>
  );
}

export function Floating(
  props: React.PropsWithChildren<{
    name: string;
    className?: string;
    style?: React.CSSProperties;
  }>
) {
  var posP = [0, 0],
    //마우스 좌표
    posM = [0, 0];
  // 노드 타겟
  let wnapp: HTMLElement | null = null;
  // child 노드 구분자

  const [snap, setSnap] = useState(false);
  const context = useContext(FloatingStateContext);

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
    if (context) {
      context.dispatch({
        type: "front",
        payload: {
          name: props.name,
        },
      });
    }

    console.log("toolClick", props);
  };

  const toolDrag: React.MouseEventHandler<HTMLDivElement> = (e) => {
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
