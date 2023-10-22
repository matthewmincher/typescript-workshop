import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { Pet } from "../api/types/pets";
import PetsApi from "../client/pets-api";

const petsApi = new PetsApi();

export default function PetActions(props: {
  pet: Pet;
  onPetRemoved: (id: number) => void;
}) {
  const [isRemovingPet, setIsRemovingPet] = useState(false);

  const handleClose = () => {
    setIsRemovingPet(false);
  };

  const handleRemove = () => {
    petsApi
      .removePet(props.pet.id)
      .then(() => props.onPetRemoved(props.pet.id))
      .then(handleClose);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ py: 2 }}
    >
      <ButtonGroup variant="contained">
        <Button color="secondary" onClick={() => setIsRemovingPet(true)}>
          Remove Pet
        </Button>
      </ButtonGroup>

      <Dialog
        open={isRemovingPet}
        onClose={handleClose}
        aria-labelledby="remove-pet-titlle"
        aria-describedby="remove-pet-description"
      >
        <DialogTitle id="alert-dialog-title">
          Remove {props.pet.name}
          <Chip label={`#${props.pet.id}`} size="small" sx={{ mx: 1 }} />?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove {props.pet.name}? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleRemove} autoFocus color="error">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
