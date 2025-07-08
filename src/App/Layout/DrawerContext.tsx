import { createContext, useContext, useState, ReactNode } from "react";

// Create context for drawer state
interface DrawerContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }
  return context;
};

interface DrawerProviderProps {
  children: ReactNode;
}

export const DrawerProvider = ({ children }: DrawerProviderProps) => {
  const [open, setOpen] = useState(false);

  return (
    <DrawerContext.Provider value={{ open, setOpen }}>
      {children}
    </DrawerContext.Provider>
  );
};
