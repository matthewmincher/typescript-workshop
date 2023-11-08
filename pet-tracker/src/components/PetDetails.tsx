import { Box, Card, Chip, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { Pet } from "../api/types/pets";
import PetVitals from "./PetVitals";
import PetAppointments from "./PetAppointments";

function PetDetails(props: { pet: Pet; onPetUpdated: (pet: Pet) => void }) {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Card
      sx={{
        px: 2,
        pt: 2,
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs
          value={selectedTab}
          onChange={(element, newValue) => setSelectedTab(newValue)}
        >
          <Tab label="Vitals" />
          <Tab label="Appointments" />
        </Tabs>
      </Box>

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

      {selectedTab === 0 && <PetVitals {...props} />}
      {selectedTab === 1 && <PetAppointments pet={props.pet} />}
    </Card>
  );
}

export default PetDetails;
