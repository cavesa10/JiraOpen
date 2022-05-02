import { ChangeEvent, useState, useMemo, FC, useContext } from 'react';
import { GetServerSideProps } from 'next'

import {
  capitalize,
  Card,
  CardHeader,
  Grid,
  CardContent,
  TextField,
  CardActions,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { Entry, EntryStatus } from "../../interfaces";
import { Layout } from "../../components/layouts";
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';
import { dateFuntions } from '../../utils';

interface Props {
  entry: Entry
}

const validStatus:EntryStatus[] = ["pending","in-progress","finished"];

const EntryPage:FC<Props> = ({entry}) => {
  const {updateEntry, deleteEntry} = useContext(EntriesContext)
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const isNotValid = useMemo(() => !inputValue.length && touched, [touched, inputValue]);

  const onInputValueChanged = (event:ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }
  const onStatusChanged = (event:ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus );
  }

  const onSave = () => {
    if(inputValue.trim().length=== 0) return;
    updateEntry({
      ...entry,
      status,
      description: inputValue
    },true)
  }

  const onDelete = () => {
    deleteEntry(entry)
  }


  return (
    <Layout title={inputValue.substring(0,15) + '...' } >
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader title={`Entrada`} subheader={dateFuntions.getFormatDistanceToNow(entry.createdAt)} />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva entrada"
                autoFocus
                multiline
                label="Nueva entrada"
                value={inputValue}
                onChange={onInputValueChanged}
                onBlur={ () => setTouched(true) }
                helperText={isNotValid && 'Ingrese un valor'}
                error={isNotValid}
              />
              <FormControl>
                <FormLabel>Estado: </FormLabel>
                <RadioGroup row value={status} onChange={onStatusChanged} >
                  {validStatus.map((options) => (
                    <FormControlLabel
                      key={options}
                      value={options}
                      control={<Radio />}
                      label={capitalize(options)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant="contained"
                fullWidth
                disabled={!inputValue.length}
                onClick={onSave}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          backgroundColor: "red",
          borderRadius: "50%",
          width: 50,
          height: 50,
        }}
        onClick={onDelete}
      >
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </Layout>
  );
};


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const {id} = params as {id: string};

  const entry = await dbEntries.getEntryById(id)

  if (!entry) {
    return{
      redirect:{
        destination: '/',
        permanent: false, // decirles a los bot de google que la página si existe
      }

    }
  }


  return {
    props: {
      entry: entry
    }
  }
}


export default EntryPage;
