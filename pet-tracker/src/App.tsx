import "./App.css";
import PetsApi from "./client/pets-api";
import { Box, CssBaseline, Grid, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import PetList from "./components/PetList";
import Header from "./layout/Header";
import PetDetails from "./components/PetDetails";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import en from "date-fns/locale/en-GB";
import { Pet } from "./api/types/pets";
import PetActions from "./components/PetActions";
import { VetsProvider } from "./context/VetsContext";
import { Vet } from "./api/types/vets";
import VetsApi from "./client/vets-api";

const theme = createTheme({
  palette: {
    primary: {
      main: "#22313f",
    },
    secondary: {
      main: "#ffae04",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

const petsApi = new PetsApi();
const vetsApi = new VetsApi();

function App() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPetId, setSelectedPetId] = useState<number>(0);
  const [vets, setVets] = useState<Vet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);

  useEffect(() => {
    vetsApi.getAllVets().then(setVets);
  }, []);

  const triggerUpdateAllPetData = useCallback(() => {
    setIsLoading(true);
    petsApi
      .getAllPets()
      .then(setPets)
      .finally(() => setIsLoading(false));
  }, []);

  const onPetUpdated = useCallback(
    (pet: Pet) => {
      const petIndex = pets.findIndex((p) => p.id === pet.id);
      if (petIndex === -1) {
        setPets([...pets, pet]);
        return;
      }

      setPets([...pets.slice(0, petIndex), pet, ...pets.slice(petIndex + 1)]);
    },
    [pets]
  );

  const onPetRemoved = useCallback(
    (id: number) => {
      const petIndex = pets.findIndex((p) => p.id === id);
      if (petIndex === -1) {
        return;
      }

      setPets([...pets.slice(0, petIndex), ...pets.slice(petIndex + 1)]);
    },
    [pets]
  );

  useEffect(triggerUpdateAllPetData, [triggerUpdateAllPetData]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={en}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box className="App">
          <Header
            triggerUpdateAllPetData={triggerUpdateAllPetData}
            appIsLoading={isLoading}
          />

          <Grid
            container
            columnSpacing={"2em"}
            sx={{
              maxWidth: "90%",
              mt: "2em",
              ml: "auto",
              mr: "auto",
            }}
          >
            <Grid item xs={4}>
              <PetList
                pets={pets}
                selectedPetId={selectedPetId}
                onSelectPet={(pet) => setSelectedPetId(pet.id)}
                onUpdatePet={onPetUpdated}
              />
            </Grid>
            <Grid item xs={8}>
              {selectedPet ? (
                <VetsProvider value={vets}>
                  <PetDetails pet={selectedPet} onPetUpdated={onPetUpdated} />
                  <PetActions pet={selectedPet} onPetRemoved={onPetRemoved} />
                </VetsProvider>
              ) : (
                <Typography>Select a pet...</Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
