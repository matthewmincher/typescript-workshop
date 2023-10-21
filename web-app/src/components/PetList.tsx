import { Pet } from "@backend/types/Pet";
import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";

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
