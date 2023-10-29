import { Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { Appointment, Vet } from "../api/types/vets";
import format from "date-fns/format";

function VetAppointment(props: { appointment: Appointment; vet: Vet }) {
  const { appointment, vet } = props;

  return (
    <Paper elevation={3}>
      <Table sx={{ minWidth: 650 }}>
        <TableBody>
          <TableRow>
            <TableCell variant="head" align="center" colSpan={2}>
              Appointment #{appointment.id}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ width: "10em" }} align="right" variant="head">
              Notes:
            </TableCell>
            <TableCell>{appointment.reason}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right" variant="head">
              Date:
            </TableCell>
            <TableCell>{format(appointment.date * 1000, "PPPpp")}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head" align="right">
              Vet:
            </TableCell>
            <TableCell>{vet.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head" align="right">
              Address:
            </TableCell>
            <TableCell>
              <address>
                {Object.values(vet.address).map((field) => (
                  <div>{field}</div>
                ))}
              </address>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head" align="right">
              Phone number:
            </TableCell>
            <TableCell>{props.vet.phoneNumber}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

export default VetAppointment;
