import { List, Paper } from "@mui/material";
import { EntryStatus } from "../../interfaces";
import { EntryCard } from "./EntryCard";
import { DragEvent, FC, useContext, useMemo } from 'react';
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";

import styles from './EntryList.module.css'

interface Props {
  status: EntryStatus
}

export const EntryList:FC<Props> = ({status}) => {

  const {entries,updateEntry} = useContext(EntriesContext);
  const {isDragging,endDragging} = useContext(UIContext);


  const entriesByStatus = useMemo( () => entries.filter(entry => entry.status === status), [entries, status])

  const onDropEntry = (event:DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData("entryId");
    console.log(id,'id',status)
    const entry = entries.find(entry => entry._id === id)!;
    updateEntry({...entry, status: status});
    endDragging();

  }

  const allowDrop = (event:DragEvent<HTMLDivElement>) => {
     event.preventDefault();
    }
  return (
    // TODO: Aquí haremos drop
    <div  className={isDragging ? styles.dragging : ''} onDrop={onDropEntry} onDragOver={allowDrop} style={{height: '100%'}} >
      <Paper
        sx={{
          height: '100%',
          background: "#424242",
          padding: '3px 5px',
        }}
      >
        {/* TODO: Cambiará dependiendo si estoy haciendo drag o no */}
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition:'all 0.2s' }}>
          {
            entriesByStatus.map(entry => (
              <EntryCard entry={entry} key={entry._id} />
            ))
          }
        </List>
      </Paper>
    </div>
  );
};
