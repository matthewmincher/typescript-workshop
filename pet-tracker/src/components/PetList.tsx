import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
} from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { useState } from "react";
import AddPetForm from "./AddPetForm";
import { Pet } from "../api/types/pets";

function PetList(props: {
  pets: Pet[];
  selectedPetId: number;
  onSelectPet: (pet: Pet) => void;
  onUpdatePet: (pet: Pet) => void;
}) {
  const [isAddingPet, setIsAddingPet] = useState(false);

  return (
    <Card>
      <List>
        <ListSubheader component="div">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            My Pets
            <IconButton
              aria-label="add"
              size="small"
              onClick={() => setIsAddingPet(true)}
            >
              <AddCircleRoundedIcon fontSize="inherit" />
            </IconButton>
          </Stack>
        </ListSubheader>

        {props.pets.map((pet) => (
          <ListItem
            key={pet.id}
            disableGutters
            disablePadding
            onClick={() => props.onSelectPet(pet)}
          >
            <ListItemButton selected={pet.id === props.selectedPetId}>
              <ListItemText primary={pet.name} data-testid="petName" />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {isAddingPet && (
        <AddPetForm
          onPetUpdated={props.onUpdatePet}
          onComplete={() => setIsAddingPet(false)}
        />
      )}
    </Card>
  );
}

export default PetList;
