/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";
import PetsApi from "../../client/pets-api";
import { Species } from "../../api/types/enums";
import { getUnixTime, parse } from "date-fns";

const { ResizeObserver } = window;

describe("App", () => {
  it("renders app title", () => {
    render(<App />);
    const titleElement = screen.getByText(/Sykes Pets/i);
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the empty pet list", () => {
    render(<App />);
    const petsListHeader = screen.getByText(/My Pets/i);
    expect(petsListHeader).toBeInTheDocument();
  });

  it("shows the saved pets", async () => {
    const spy = jest.spyOn(PetsApi.prototype, "getAllPets");
    const petName = "Spud";
    spy.mockResolvedValueOnce([
      {
        id: 1,
        name: petName,
        species: Species.Cat,
        weight: {
          minimumWeight: 5,
          maximumWeight: 6.5,
          weighIns: [],
        },
      },
    ]);

    render(<App />);

    await screen.findByTestId("petName");
    expect(screen.getByText(petName)).toBeInTheDocument();
  });

  it("shows the pets weight history when clicked", async () => {
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));

    const spy = jest.spyOn(PetsApi.prototype, "getAllPets");
    const petName = "Spud";
    spy.mockResolvedValueOnce([
      {
        id: 1,
        name: petName,
        species: Species.Cat,
        weight: {
          minimumWeight: 5,
          maximumWeight: 6.5,
          weighIns: [
            {
              date: getUnixTime(parse("2023-10-10", "y-MM-dd", Date.now())),
              weight: 6.8,
            },
          ],
        },
      },
    ]);

    render(<App />);
    const petNameElement = await screen.findByTestId("petName");

    act(() => {
      userEvent.click(petNameElement);
    });

    const table = await screen.findByRole("table");

    expect(table).toHaveTextContent(/Species/i);
    expect(table).toHaveTextContent(/cat/i);

    expect(table).toHaveTextContent(/Weight/i);
    expect(table).toHaveTextContent("6.8kg");

    window.ResizeObserver = ResizeObserver;
  });
});
