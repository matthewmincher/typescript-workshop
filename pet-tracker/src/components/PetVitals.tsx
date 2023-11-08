import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Container,
} from "@mui/material";
import { useState } from "react";
import { Pet } from "../api/types/pets";
import AddWeightReadingForm from "./AddWeightReadingForm";
import PetWeightGraph from "./PetWeightGraph";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

function PetVitals(props: { pet: Pet; onPetUpdated: (pet: Pet) => void }) {
  const latestWeightReading = props.pet.weight?.weighIns.at(-1);

  const [isAddingWeightRecord, setIsAddingWeightRecord] = useState(false);

  return (
    <div>
      <Table sx={{ minWidth: 650 }}>
        <TableBody>
          <TableRow>
            <TableCell sx={{ width: "10em" }} align="right" variant="head">
              Species:
            </TableCell>
            <TableCell colSpan={2} sx={{ textTransform: "capitalize" }}>
              {props.pet.species.toLowerCase()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head" align="right">
              Weight:
            </TableCell>
            <TableCell>
              {latestWeightReading
                ? `${latestWeightReading.weight}kg`
                : `Unknown`}
            </TableCell>
            <TableCell sx={{ width: "10em" }} align="right">
              <IconButton
                aria-label="Add"
                size="small"
                onClick={() => setIsAddingWeightRecord(true)}
              >
                <AddCircleRoundedIcon fontSize="inherit" />
              </IconButton>
              {isAddingWeightRecord && (
                <AddWeightReadingForm
                  pet={props.pet}
                  onPetUpdated={props.onPetUpdated}
                  onComplete={() => setIsAddingWeightRecord(false)}
                />
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {latestWeightReading && (
        <Container sx={{ mt: 4 }}>
          <PetWeightGraph
            minimumWeight={props.pet.weight!.minimumWeight}
            maximumWeight={props.pet.weight!.maximumWeight}
            weighIns={props.pet.weight!.weighIns}
          />
        </Container>
      )}
    </div>
  );
}

export default PetVitals;
