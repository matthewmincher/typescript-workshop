import { Appointment, Vet } from "../api/types/vets";

/**
 * 1.
 * Add a generic result type that has a payload field such that the following JSON can be represented:
 * {
 *    payload: array of vets
 * }
 * Add this type to the getAllVets query to match a payload that is an array of Vet objects.
 */

/**
 * 2.
 * Add a generic PagedResult type that extends the first result that includes pagination information:
 * {
 *    payload: array of appointments,
 *    pagination: {
 *      totalCount: 20
 *    }
 * }
 * Add this type to the getAllAppointments query to match a payload that is an array of Appointment objects
 */

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
