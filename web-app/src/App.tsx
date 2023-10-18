import "./App.css";
import PetsApi from "./api/pets-api";
import { Pet } from "@backend/types/Pet";
import { Card, CssBaseline, Grid, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import PetList from "./components/PetList";
import Header from "./components/Header";
import PetDetails from "./components/PetDetails";

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

  useEffect(() => {
    refreshPetsList();

    return () => {
      clearInterval(refreshTimeoutRef.current);
    };
  }, [refreshPetsList]);

  const selectedPet = pets.find((pet) => pet.id === selectedPetId);

  return (
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
              <PetDetails pet={selectedPet} />
            ) : (
              <Typography>Select a pet...</Typography>
            )}
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
