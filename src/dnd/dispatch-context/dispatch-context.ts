import { createContext } from "react";

const context = createContext<Function>(() => null)

export default context;