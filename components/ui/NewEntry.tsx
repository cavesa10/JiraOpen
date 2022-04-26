import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent, useState, useContext } from 'react';
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { EntriesContext } from '../../context/entries/';
import { UIContext } from "../../context/ui";

export const NewEntry = () => {
  const {addNewEntry} = useContext(EntriesContext)
  const {isAddingEntry,setIsAddingEntry} = useContext(UIContext)



  const [inputValue, setInputValue] = useState("");
  const [isTouch, setIsTouch] = useState(false);

  const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setIsTouch(true);
  };

  const onSave = () => {
    if (inputValue.length > 0) {
      addNewEntry(inputValue);
      setIsAddingEntry(false);
      setIsTouch(false);
      setInputValue("");
    } else {
      return;
    }
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="Nueva Entrada"
            autoFocus
            multiline
            label="Nueva Entrada"
            error={!inputValue && isTouch}
            helperText={!inputValue && isTouch && "Ingrese un varlo"}
            value={inputValue}
            onChange={onTextFieldChanged}
            onBlur={() => setIsTouch(true)}
          />
          <Box display="flex" justifyContent="space-between">
            <Button
              onClick={() => setIsAddingEntry(false)}
              variant="outlined"
              endIcon={<SaveOutlinedIcon />}
            >
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlinedIcon />}
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          onClick={() => setIsAddingEntry(true)}
          startIcon={<AddIcon />}
          fullWidth
          variant="outlined"
        >
          Agregar Tarea
        </Button>
      )}
    </Box>
  );
};
