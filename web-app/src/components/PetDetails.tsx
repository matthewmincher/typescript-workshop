import {
  Card,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

function PetDetails(props: { pet: any }) {
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
            <TableCell colSpan={2} align="center">
              Vitals
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell sx={{ width: "10em" }} align="right" variant="head">
              Species:
            </TableCell>
            <TableCell>{props.pet.species}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head" align="right">
              Weight:
            </TableCell>
            <TableCell>{props.pet.weight}kg</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
}

export default PetDetails;
