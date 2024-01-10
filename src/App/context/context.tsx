import {createContext} from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// export const SeasonContext = createContext(['', (_value: string) => ]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SeasonContext = createContext<any | undefined>(undefined);