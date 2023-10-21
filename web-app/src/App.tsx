import "./App.css";
import PetsApi from "./api/pets-api";
import { Pet } from "@backend/types/Pet";
import { CssBaseline, Grid, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import PetList from "./components/PetList";
import Header from "./components/Header";
import PetDetails from "./components/PetDetails";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import en from "date-fns/locale/en-GB";

const theme = createTheme({
  palette: {},
});

const petsApi = new PetsApi();
const REFRESH_LIST_INTERVAL_MS = 5000;

function App() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPetId, setSelectedPetId] = useState<number>(0);
  const refreshTimeoutRef = useRef<NodeJS.Timeout>();
  const refreshPetsList = useCallback(() => {
    petsApi
      .getAllPets()
      .then((pets) => {
        setPets(pets);
      })
      .finally(() => {
        refreshTimeoutRef.current = setTimeout(
          refreshPetsList,
          REFRESH_LIST_INTERVAL_MS
        );
      });
  }, []);

  const onPetUpdated = useCallback(
    (pet: Pet) => {
      const petIndex = pets.findIndex((p) => p.id === pet.id);
      if (petIndex === -1) {
        return;
      }

      setPets([...pets.slice(0, petIndex), pet, ...pets.slice(petIndex + 1)]);
    },
    [pets]
  );

  useEffect(() => {
    refreshPetsList();

    return () => {
      clearInterval(refreshTimeoutRef.current);
    };
  }, [refreshPetsList]);

  const selectedPet = pets.find((pet) => pet.id === selectedPetId);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={en}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Header />

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
              />
            </Grid>
            <Grid item xs={8}>
              {selectedPet ? (
                <PetDetails pet={selectedPet} onPetUpdated={onPetUpdated} />
              ) : (
                <Typography>Select a pet...</Typography>
              )}
            </Grid>
          </Grid>
        </div>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
