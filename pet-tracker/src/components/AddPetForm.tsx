import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import PetsApi from "../client/pets-api";
import { DatePicker } from "@mui/x-date-pickers";

type AddPetProps = {
  onComplete: () => void;
};
type Inputs = {
  name: string;
  species: string;
};
type Errors = Partial<Record<keyof Inputs, string>>;

const validate = (newInputs: Inputs): Errors => {
  const newErrors: Errors = {};

  return newErrors;
};

const petsApi = new PetsApi();

export default function AddPetForm(props: AddPetProps) {
  const [input, setInput] = useState<Inputs>({
    name: "",
    species: "OTHER",
  });
  const [errors, setErrors] = useState<Errors>({});

  const handleClose = () => {
    props.onComplete();
  };

  const handleSubmit = () => {
    if (Object.keys(errors).length !== 0) {
      return;
    }
  };

  return (
    <div>
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>Add Pet</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add your pets details below to start managing their life
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            variant="standard"
            error={errors.name !== undefined}
            onChange={(e) => {
              const newInput = { ...input, name: e.target.value };

              setInput(newInput);
              setErrors(validate(newInput));
            }}
            value={input.name}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            disabled={Object.keys(errors).length !== 0}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
