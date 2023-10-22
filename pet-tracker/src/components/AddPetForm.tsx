import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import { useEffect, useState } from "react";
import PetsApi from "../client/pets-api";
import { Species } from "../api/types/enums";
import { Pet } from "../api/types/pets";

type AddPetProps = {
  onPetUpdated: (pet: Pet) => void;
  onComplete: () => void;
};
type Inputs = {
  name: string;
  species: string;
};
type Errors = Partial<Record<keyof Inputs, string>>;

const validate = (newInputs: Inputs): Errors => {
  const newErrors: Errors = {};

  if (!newInputs.name.trim()) {
    newErrors.name = "Name must be filled in";
  }

  return newErrors;
};

const petsApi = new PetsApi();

export default function AddPetForm(props: AddPetProps) {
  const [input, setInput] = useState<Inputs>({
    name: "",
    species: Species.Other,
  });
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    setErrors(validate(input));
  }, [input]);

  const handleClose = () => {
    props.onComplete();
  };

  const handleSubmit = () => {
    if (Object.keys(errors).length !== 0) {
      return;
    }

    petsApi
      .addPet(input.name.trim(), input.species)
      .then(props.onPetUpdated)
      .then(handleClose);
  };

  return (
    <div>
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>Add Pet</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add your pet's details below to start managing their life 🐶
          </DialogContentText>

          <FormControl fullWidth>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              variant="outlined"
              error={errors.name !== undefined}
              onChange={(e) => {
                const newInput = { ...input, name: e.target.value };

                setInput(newInput);
                setErrors(validate(newInput));
              }}
              value={input.name}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="species-select-label">Species</InputLabel>
            <Select
              labelId="species-select-label"
              label="Species"
              variant="outlined"
              value={input.species}
              sx={{ textTransform: "capitalize" }}
              onChange={(e) => {
                const newInput = { ...input, species: e.target.value };

                setInput(newInput);
                setErrors(validate(newInput));
              }}
            >
              {Object.keys(Species).map((key) => (
                <MenuItem
                  key={key}
                  sx={{ textTransform: "capitalize" }}
                  value={Species[key as keyof typeof Species]}
                >
                  {key.toLowerCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            disabled={Object.keys(errors).length !== 0}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
