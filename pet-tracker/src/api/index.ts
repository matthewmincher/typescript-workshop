import express, { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import PetService from "./services/pet-service";
import cors from "cors";
import parse from "date-fns/parse";
import VetService from "./services/vet-service";
import { LightModeTwoTone } from "@mui/icons-material";

const PORT = 7000;
const app = express();

const petsService = new PetService();
const vetsService = new VetService();
const petsRouter = express.Router();
const vetsRouter = express.Router();

/**
 * curl -w "\n" 'http://localhost:7000/api/pets'
 */
petsRouter.get("/", async (req: Request, res: Response) => {
  const allPets = await petsService.all();

  return res.status(HttpStatus.OK).send(allPets);
});

/**
 * curl -w "\n" 'http://localhost:7000/api/pets/1'
 */
petsRouter.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const pet = await petsService.find(id);

    if (pet) {
      return res.status(HttpStatus.OK).send(pet);
    }

    return res.status(HttpStatus.NOT_FOUND).send("Not found 😿");
  } catch (e) {
    let message = "Unknown Error";

    if (e instanceof Error) {
      message = e.message;
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(message);
  }
});

/**
 * curl -w "\n"  -XPOST -H "Content-type: application/json" -d '{"name": "Fred", "species": "Tortoise", "weight": {"minimumWeight": 1, "maximumWeight": 2, "weighIns": []}}' 'http://localhost:7000/api/pets'
 */
petsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const pet = await petsService.create(req.body);

    return res.status(HttpStatus.CREATED).send(pet);
  } catch (e) {
    let message = "Unknown Error";

    if (e instanceof Error) {
      message = e.message;
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(message);
  }
});

/**
 * curl -w "\n"  -XDELETE 'http://localhost:7000/api/pets/2'
 */
petsRouter.delete("/:id", async (req: Request, res: Response) => {
  const petId = parseInt(req.params.id);

  try {
    const deleted = await petsService.delete(petId);

    if (deleted) {
      return res.status(HttpStatus.NO_CONTENT).send();
    }

    return res.status(HttpStatus.NOT_FOUND).send("Not found 😿");
  } catch (e) {
    let message = "Unknown Error";

    if (e instanceof Error) {
      message = e.message;
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(message);
  }
});

/**
 * curl -w "\n"  -XPOST -H "Content-type: application/json" -d '{"minimumWeight": 5, "maximumWeight": 6.5, "weight": 9, "date": "2023-10-21"}' 'http://localhost:7000/api/pets/1/weight'
 */
petsRouter.post("/:id/weight", async (req: Request, res: Response) => {
  try {
    const petId = parseInt(req.params.id);
    const { minimumWeight, maximumWeight, date, weight } = req.body;
    const pet = await petsService.addWeight(
      petId,
      minimumWeight,
      maximumWeight,
      parse(date, "y-MM-dd", Date.now()),
      weight
    );

    return res.status(HttpStatus.OK).send(pet);
  } catch (e) {
    let message = "Unknown Error";

    if (e instanceof Error) {
      message = e.message;
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(message);
  }
});

/**
 * curl -w "\n" 'http://localhost:7000/api/pets/1/appointments'
 */
petsRouter.get("/:id/appointments", async (req: Request, res: Response) => {
  try {
    const petId = parseInt(req.params.id);
    const appointments = await petsService.getAppointmentsFor(petId);
    return res.status(HttpStatus.OK).send(appointments);
  } catch (e) {
    let message = "Unknown Error";
    if (e instanceof Error) {
      message = e.message;
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(message);
  }
});

/**
 * curl -w "\n" 'http://localhost:7000/api/vets'
 */
vetsRouter.get("/", async (req: Request, res: Response) => {
  const allVets = await vetsService.all();

  return res.status(HttpStatus.OK).send({
    payload: allVets,
  });
});

/**
 * curl -w "\n" 'http://localhost:7000/api/vets/1/appointments'
 */
vetsRouter.get(
  "/:id/appointments",
  async (
    req: Request<{ id: string }, any, any, { offset: string; limit: string }>,
    res: Response
  ) => {
    try {
      const vetId = parseInt(req.params.id),
        offset = parseInt(req.query.offset),
        limit = parseInt(req.query.limit);

      const start = offset;
      const end = start + limit;

      const appointments = await vetsService.appointments(vetId);
      return res.status(HttpStatus.OK).send({
        payload: appointments.slice(start, end),
        pagination: {
          totalCount: appointments.length,
        },
      });
    } catch (e) {
      let message = "Unknown Error";
      if (e instanceof Error) {
        message = e.message;
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(message);
    }
  }
);

/**
 * curl -w "\n"  -XPOST -H "Content-type: application/json" -d '{"date": "2023-10-21", "reason": "Pick up health plan", "petId": 1}' 'http://localhost:7000/api/vets/1/appointments'
 */
vetsRouter.post("/:id/appointments", async (req: Request, res: Response) => {
  try {
    const vetId = parseInt(req.params.id);
    const appointment = await vetsService.makeAppointment(
      vetId,
      req.body.petId,
      parse(req.body.date, "y-MM-dd", Date.now()),
      req.body.reason
    );

    return res.status(HttpStatus.CREATED).send({
      payload: appointment,
    });
  } catch (e) {
    let message = "Unknown Error";

    if (e instanceof Error) {
      message = e.message;
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(message);
  }
});

/**
 * curl -w "\n"  -XDELETE 'http://localhost:7000/api/vets/1/appointments/1'
 */
vetsRouter.delete(
  "/:id/appointments/:appointmentId",
  async (req: Request, res: Response) => {
    const vetId = parseInt(req.params.id);
    const appointmentId = parseInt(req.params.appointmentId);

    try {
      const deleted = await vetsService.cancelAppointment(vetId, appointmentId);

      if (deleted) {
        return res.status(HttpStatus.NO_CONTENT).send();
      }

      return res.status(HttpStatus.NOT_FOUND).send("Not found 😿");
    } catch (e) {
      let message = "Unknown Error";

      if (e instanceof Error) {
        message = e.message;
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(message);
    }
  }
);

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use(express.json());
app.use("/api/pets", petsRouter);
app.use("/api/vets", vetsRouter);
app.listen(PORT, () => {
  console.info(`Listening on port ${PORT}`);
});
