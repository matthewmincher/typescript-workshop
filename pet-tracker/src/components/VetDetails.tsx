import {
  Card,
  Chip,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { Appointment, Vet } from "../api/types/vets";
import { useCallback, useEffect, useState } from "react";
import VetsApi from "../client/vets-api";
import VetAppointment from "./VetAppointment";

const vetsApi = new VetsApi();

type PagingState = {
  maxPage: number;
  currentPage: number;
};

const PER_PAGE = 5;

function VetDetails(props: { vet: Vet }) {
  const [appointments, setAppointments] = useState<Appointment[]>();
  const [paging, setPaging] = useState<PagingState>({
    maxPage: 0,
    currentPage: 0,
  });

  const loadAppointments = useCallback(
    function (page: number) {
      const vetId = props.vet.id,
        offset = (page - 1) * PER_PAGE,
        limit = PER_PAGE;

      /**
       * 1.
       * Make a call to getAllAppointments, then do the following with the response:
       *  call setAppointments with the data
       *  call setPaging with the currentPage and maxPage
       *    (maxPage is: the total count divided by PER_PAGE, rounded up)
       */
    },
    [props.vet.id]
  );

  const handleChangePage = function (page: number) {
    loadAppointments(page);
  };
  useEffect(() => {
    loadAppointments(1);
  }, [loadAppointments]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [appointments]);

  return (
    <Card
      sx={{
        p: 2,
        mb: 2,
      }}
    >
      <div>
        <div>
          <Typography
            display={"inline-block"}
            sx={{ verticalAlign: "middle", mr: 1 }}
            variant="h4"
          >
            {props.vet.name}
          </Typography>
          <Chip label={`#${props.vet.id}`} size="small" />
        </div>

        <Typography
          display={"inline-block"}
          sx={{ verticalAlign: "middle", mr: 1 }}
          variant="h5"
        >
          Appointments
        </Typography>

        {appointments === undefined && (
          <CircularProgress
            sx={{
              my: 4,
              mx: "auto",
              display: "block",
            }}
          />
        )}

        <Stack spacing={2} sx={{ m: 4 }}>
          {appointments &&
            appointments.map((appointment) => (
              <VetAppointment vet={props.vet} appointment={appointment} />
            ))}
        </Stack>

        {paging.maxPage > 1 && (
          <Stack alignItems="center" sx={{ p: 2 }}>
            <Pagination
              count={paging.maxPage}
              page={paging.currentPage}
              onChange={(_event, page) => handleChangePage(page)}
            />
          </Stack>
        )}
      </div>
    </Card>
  );
}

export default VetDetails;
