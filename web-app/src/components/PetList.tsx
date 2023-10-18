import { Pets } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { ReactElement, ReactNode } from "react";

function PetList(props: {
  pets: any;
  selectedPetId: any;
  onSelectPet: (pet: any) => void;
}) {
  return (
    <Card>
      <List>
        <ListSubheader component="div">My Pets </ListSubheader>
        {props.pets.map((pet: any) => (
          <ListItem
            key={pet.id}
            disableGutters
            disablePadding
            onClick={() => props.onSelectPet(pet)}
          >
            <ListItemButton>
              <ListItemText primary={pet.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}

export default PetList;
