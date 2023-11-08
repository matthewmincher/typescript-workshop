import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { useContext } from "react";
import VetsContext from "../context/VetsContext";
import { Vet } from "../api/types/vets";

function VetList(props: {
  selectedVetId: number;
  onSelectVet: (vet: Vet) => void;
}) {
  const vets = useContext(VetsContext);

  return (
    <Card>
      <List>
        <ListSubheader component="div">My Vets</ListSubheader>

        {vets.map((vet) => (
          <ListItem
            key={vet.id}
            disableGutters
            disablePadding
            onClick={() => props.onSelectVet(vet)}
          >
            <ListItemButton selected={vet.id === props.selectedVetId}>
              <ListItemText primary={vet.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}

export default VetList;
