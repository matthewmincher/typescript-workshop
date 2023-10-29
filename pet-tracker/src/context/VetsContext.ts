import React from "react";
import { Vet } from "../api/types/vets";

const VetsContext = React.createContext<Vet[]>([]);

export const VetsProvider = VetsContext.Provider;
export default VetsContext;
