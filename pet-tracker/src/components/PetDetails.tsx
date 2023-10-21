import {
  Card,
  Chip,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import PetWeightGraph from "./PetWeightGraph";
import AddWeightReadingForm from "./AddWeightReadingForm";
import { useState } from "react";
import { Pet } from "../api/types/Pet";

function PetDetails(props: { pet: Pet; onPetUpdated: (pet: Pet) => void }) {
  const latestWeightReading = props.pet.weight?.weighIns.at(-1);

  const [isAddingWeightRecord, setIsAddingWeightRecord] = useState(false);
  return (
    <Card
      sx={{
        p: 2,
      }}
    >
      <div>
        <Typography
          display={"inline-block"}
          sx={{ verticalAlign: "middle", mr: 1 }}
          variant="h4"
        >
          {props.pet.name}
        </Typography>
        <Chip label={`#${props.pet.id}`} size="small" />
      </div>

      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell colSpan={3} align="center">
              Vitals
            </TableCell>
          </TableRow>
        </TableHead>
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
    </Card>
  );
}

export default PetDetails;
