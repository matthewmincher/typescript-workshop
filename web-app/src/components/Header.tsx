import {
  AppBar,
  CircularProgress,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
type HeaderProps = {
  triggerUpdateAllPetData: () => void;
  appIsLoading: boolean;
};

export default function Header(props: HeaderProps) {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          Sykes Pets™
        </Typography>

        {props.appIsLoading ? (
          <CircularProgress color="secondary" />
        ) : (
          <IconButton
            aria-label="refresh"
            size="large"
            onClick={props.triggerUpdateAllPetData}
          >
            <AutorenewRoundedIcon color="secondary" fontSize="inherit" />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}
