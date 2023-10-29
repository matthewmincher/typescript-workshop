import { Appointment, Vet } from "../api/types/vets";

interface Result<T> {
  payload: T;
}

interface PagedResult<T> extends Result<T> {
  pagination: {
    totalCount: number;
  };
}

export default class VetsApi {
  async getAllVets(): Promise<Result<Vet[]>> {
    return fetch("http://localhost:7000/api/vets").then((response) =>
      response.json()
    );
  }

  async getAllAppointments(
    vetId: number,
    offset: number,
    limit: number
  ): Promise<PagedResult<Appointment[]>> {
    return fetch(
      `http://localhost:7000/api/vets/${vetId}/appointments?offset=${offset}&limit=${limit}`
    ).then((response) => response.json());
  }
}
