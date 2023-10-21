import express, { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import PetService from "./services/pet-service";
import cors from "cors";
import parse from "date-fns/parse";

const PORT = 7000;
const app = express();
const router = express.Router();

const petsService = new PetService();

/**
 * curl -w "\n" 'http://localhost:7000/api/pets'
 */
router.get("/", async (req: Request, res: Response) => {
  const allPets = await petsService.all();

  return res.status(HttpStatus.OK).send(allPets);
});

/**
 * curl -w "\n" 'http://localhost:7000/api/pets/1'
 */
router.get("/:id", async (req: Request, res: Response) => {
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
router.post("/", async (req: Request, res: Response) => {
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
router.delete("/:id", async (req: Request, res: Response) => {
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
router.post("/:id/weight", async (req: Request, res: Response) => {
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

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use(express.json());
app.use("/api/pets", router);
app.listen(PORT, () => {
  console.info(`Listening on port ${PORT}`);
});
