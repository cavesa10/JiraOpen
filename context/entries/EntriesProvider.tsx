import { FC, useEffect, useReducer } from "react";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";
import { v4 as uuidv4 } from "uuid";
import { entriesApi } from "../../apis";

export interface EntriesState {
  entries: Entry[];
}

export interface Props {
  children: React.ReactNode;
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
}

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  useEffect(() => {
    refreshEntries()
  }, [])

  const refreshEntries = async () => {
    const {data} = await entriesApi.get<Entry[]>('/entries')
    dispatch({type: 'Entries - refresh-data', payload: data})
   }


  const addNewEntry = async (description:string) => {
    // const newEntry: Entry ={
    //   _id: uuidv4(),
    //   description,
    //   createdAt: Date.now(),
    //   status: "pending"
    // }
    try {

      const {data} = await entriesApi.post<Entry>('/entries', {description})
      dispatch({ type: "Entries - add-entry", payload: data });
    } catch (error) {
      console.log(error)
    }
  };


  const updateEntry = async (entry:Entry) => {
    const {data} = await entriesApi.put<Entry>(`/entries/${entry._id}`, {description: entry.description, status: entry.status})
    try {
      dispatch({ type: "Entries - update-entry", payload: data });

    } catch (error) {
      console.log({error})
    }
  };

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
        refreshEntries
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
