import { FC, useReducer } from "react";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";
import { v4 as uuidv4 } from "uuid";

export interface EntriesState {
  entries: Entry[];
}

export interface Props {
  children: React.ReactNode;
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
      {
          _id: uuidv4(),
          description: 'Pendiente: Proident dolor duis elit sunt qui dolor laborum veniam ea laboris qui consequat.',
          status: 'pending',
          createdAt: 123,
      },
      {
          _id: uuidv4(),
          description: 'En-Progreso Veniam in cupidatat adipisicing Lorem sunt est est ex cillum laboris fugiat officia fugiat.',
          status: 'in-progress',
          createdAt: 1000000,
      },
      {
          _id: uuidv4(),
          description: 'Terminadas: Commodo veniam aliqua tempor officia officia non laborum.',
          status: 'finished',
          createdAt: 100000,
      },
  ],
}

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const addNewEntry = (description:string) => {
    const newEntry: Entry ={
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: "pending"
    }
    dispatch({ type: "Entries - add-entry", payload: newEntry });
  };
  const updateEntry = (entry:Entry) => {
    dispatch({ type: "Entries - update-entry", payload: entry });
  };

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
