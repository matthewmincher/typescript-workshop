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
import { Pet } from "../api/types/Pet";

type AddWeightReadingFormProps = {
  pet: Pet;
  onPetUpdated: (pet: Pet) => void;
  onComplete: () => void;
};
type Inputs = {
  minimumWeight: string;
  maximumWeight: string;
  newWeight: string;
};
type Errors = Partial<Record<keyof Inputs, string>>;

const validate = (newInputs: Inputs): Errors => {
  const newErrors: Errors = {};

  if (isNaN(Number(newInputs.minimumWeight))) {
    newErrors.minimumWeight = "Minimum weight must be a number";
  }

  if (isNaN(Number(newInputs.maximumWeight))) {
    newErrors.maximumWeight = "Maximum weight must be a number";
  }

  if (isNaN(Number(newInputs.newWeight))) {
    newErrors.newWeight = "New weight must be a number";
  }

  if (newInputs.minimumWeight === "") {
    newErrors.minimumWeight = "Minimum weight must filled in";
  }

  if (newInputs.maximumWeight === "") {
    newErrors.maximumWeight = "Maximum weight must filled in";
  }

  if (newInputs.newWeight === "") {
    newErrors.newWeight = "Current weight must filled in";
  }

  return newErrors;
};

const petsApi = new PetsApi();

export default function AddWeightReadingForm(props: AddWeightReadingFormProps) {
  const initialState: Inputs = {
    minimumWeight: props.pet.weight?.minimumWeight.toString() || "",
    maximumWeight: props.pet.weight?.maximumWeight.toString() || "",
    newWeight: "",
  };

  const [weights, setWeights] = useState(initialState);
  const [weighInDate, setWeighInDate] = useState<Date | null>(new Date());
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    setErrors(validate(weights));
  }, [weights]);

  const handleClose = () => {
    props.onComplete();
  };

  const handleSubmit = () => {
    if (Object.keys(errors).length !== 0) {
      return;
    }

    petsApi
      .addWeightForPet(
        props.pet.id,
        Number(weights.minimumWeight),
        Number(weights.maximumWeight),
        weighInDate ?? new Date(),
        Number(weights.newWeight)
      )
      .then((pet) => {
        props.onPetUpdated(pet);
        handleClose();
      });
  };

  return (
    <div>
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>Weigh in</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new weigh in for your pet. You can also update their healthy
            weight range if you like.
          </DialogContentText>
          <TextField
            margin="dense"
            id="minimumWeight"
            label="Minimum healthy weight (kg)"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            fullWidth
            variant="standard"
            error={errors.minimumWeight !== undefined}
            onChange={(e) => {
              const newState = { ...weights, minimumWeight: e.target.value };

              setWeights(newState);
              setErrors(validate(newState));
            }}
            value={weights.minimumWeight}
          />
          <TextField
            margin="dense"
            id="maximumWeight"
            label="Maximum healthy weight (kg)"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            fullWidth
            variant="standard"
            error={errors.maximumWeight !== undefined}
            onChange={(e) => {
              const newState = { ...weights, maximumWeight: e.target.value };

              setWeights(newState);
              setErrors(validate(newState));
            }}
            value={weights.maximumWeight}
          />

          <DatePicker
            label="Weigh in date"
            slotProps={{ textField: { fullWidth: true, variant: "standard" } }}
            value={weighInDate}
            onChange={setWeighInDate}
          />

          <TextField
            autoFocus
            margin="dense"
            id="weight"
            label="Weight (kg)"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            fullWidth
            variant="standard"
            error={errors.newWeight !== undefined}
            onChange={(e) => {
              const newState = { ...weights, newWeight: e.target.value };

              setWeights(newState);
              setErrors(validate(newState));
            }}
            value={weights.newWeight}
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
