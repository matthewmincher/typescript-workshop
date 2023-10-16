import React, { useEffect, useState } from 'react';
import './App.css';
import PetsApi from './api/pets-api';
import { Pet } from '@backend/types/Pet';
import { CssBaseline, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
});

const petsApi = new PetsApi();

function App() {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    let interval = setInterval(() => {
      petsApi.getAllPets().then((pets) => {
        setPets(pets);
      })
    }, 5000);

    return () => {
      clearInterval(interval);
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <List sx={{ width: '100%', maxWidth: 360 }}>
          {pets.map(pet => {
              return (
                <ListItem
                  key={pet.id}>
                    <ListItemButton>
                      <ListItemText primary={pet.name} />
                    </ListItemButton>
                </ListItem>
              )
            })}
        </List>
      </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
