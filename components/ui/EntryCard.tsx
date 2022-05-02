import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { FC, DragEvent, useContext } from "react";
import { UIContext } from "../../context/ui";
import { Entry } from "../../interfaces";
import { dateFuntions } from '../../utils/';

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { endDragging, startDragging } = useContext(UIContext);
  const router = useRouter()
  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData("entryId", entry._id);
    // todo: modificar el estado para indicar que estoy haciedo drag
    startDragging();
  };
  const onDragEnd = () => {
    endDragging();
  };

  const onClick = ( ) => {
    router.push(`/entries/${entry._id}`)
    }

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ display: "flex", justifyContent: "flex-end", paddingRight: 2 }}
        >
          <Typography variant="body2">{dateFuntions.getFormatDistanceToNow(entry.createdAt)}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
