import { useContext, useEffect, useState } from "react";
import { Appointment } from "../api/types/vets";
import PetsApi from "../client/pets-api";
import { Pet } from "../api/types/pets";
import { CircularProgress, Stack, Typography } from "@mui/material";
import VetsContext from "../context/VetsContext";
import VetAppointment from "./VetAppointment";

const petApi = new PetsApi();

function PetAppointments(props: { pet: Pet }) {
  const vets = useContext(VetsContext);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    petApi.getAppointments(props.pet.id).then((appointments) => {
      setAppointments(appointments);
      setIsLoading(false);
    });
  }, [props.pet.id]);

  return (
    <div>
      <Typography
        display={"inline-block"}
        sx={{ verticalAlign: "middle", mr: 1 }}
        variant="h5"
      >
        Appointments
      </Typography>

      {isLoading && (
        <CircularProgress
          sx={{
            my: 4,
            mx: "auto",
            display: "block",
          }}
        />
      )}

      <Stack spacing={2} sx={{ m: 4 }}>
        {appointments.map((appointment) => {
          const vet = vets.find((vet) => vet.id === appointment.vetId);
          if (!vet) return null;

          return (
            <VetAppointment
              key={appointment.id}
              appointment={appointment}
              vet={vet}
            />
          );
        })}
      </Stack>
    </div>
  );
}

export default PetAppointments;
