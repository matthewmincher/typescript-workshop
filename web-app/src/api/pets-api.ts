export default class PetsApi {
  async getAllPets(): Promise<any[]> {
    return fetch("http://localhost:7000/api/pets").then((response) =>
      response.json()
    );
  }
}
