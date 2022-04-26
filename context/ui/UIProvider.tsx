import { FC, useReducer } from "react";

import { UIContext, uiReducer } from "./";

export interface UIState {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

export interface Props {
  children: React.ReactNode;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false
};

export const UIProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSidemenu = () => dispatch({ type: "UI - Open Sidebar" });
  const closeSidemenu = () => dispatch({ type: "UI - Close Sidebar" });
  const setIsAddingEntry = (isADDing:boolean) => dispatch({ type: "UI - IsAddingEntry", payload: isADDing });
  const startDragging = () => dispatch({ type: "UI - Start Dragging" });
  const endDragging = () => dispatch({ type: "UI - End Dragging" });

  return (
    <UIContext.Provider
      value={{
        ...state,
        openSidemenu,
        closeSidemenu,

        setIsAddingEntry,

        endDragging,
        startDragging
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
