import { createContext } from 'react';

interface ContextProps {
    sidemenuOpen: boolean
    isAddingEntry: boolean
    isDragging: boolean

    setIsAddingEntry: (isAdding : boolean) => void

    openSidemenu: () => void
    closeSidemenu: () => void

    startDragging: () => void
    endDragging: () => void

}

export const UIContext = createContext({} as ContextProps);