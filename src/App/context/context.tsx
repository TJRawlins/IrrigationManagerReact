import { createContext } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// export const SeasonContext = createContext(['', (_value: string) => ]);

//TODO - STEP 1: CREATE CONTEXT
// console.debug("STEP 1: CREATE CONTEXT - context.tsx");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SeasonContext = createContext<any | undefined>(undefined);