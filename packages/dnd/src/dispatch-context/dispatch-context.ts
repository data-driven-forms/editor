import { createContext } from "react";

const context = createContext<(...args: any) => any>(() => null)

export default context;