import { Entry } from '../../interfaces';
import { EntriesState } from './';

type EntriesActionType =
  | { type: 'Entries - add-entry', payload: Entry }
  | { type: 'Entries - update-entry', payload: Entry }
  | { type: 'Entries - refresh-data', payload: Entry[] }
  | { type: 'Entries - delete-data', payload: Entry }

export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {
  switch (action.type) {
    case 'Entries - add-entry':
      return {
        ...state,
        entries: [...state.entries, action.payload]
      };
    case 'Entries - update-entry':
      return {
        ...state,
        entries: state.entries.map(entry => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }
          return entry;
        })
      };
    case 'Entries - refresh-data':
      return {
        ...state,
        entries: [...action.payload]
      };
    case 'Entries - delete-data':
      return {
        ...state,
        entries: state.entries.filter(entry => entry._id !== action.payload._id)
      };
    default:
      return state;
  }
};