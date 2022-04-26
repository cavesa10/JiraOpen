import { Entry } from '../../interfaces';
import { EntriesState } from './';

type EntriesActionType =
  | { type: 'Entries - add-entry', payload: Entry }
  | { type: 'Entries - update-entry', payload: Entry }

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
    default:
      return state;
  }
};