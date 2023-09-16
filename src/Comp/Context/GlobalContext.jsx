import { createContext, useContext, useState } from "react";
import { useImmer } from "use-immer";

const StepContext = createContext(null);
const SetStepContext = createContext(null);

const DataContext = createContext(null);
const SetDataContext = createContext(null);

export const useStep = () => useContext(StepContext);
export const useSetStep = () => useContext(SetStepContext);

export const useData = () => useContext(DataContext);
export const useSetData = () => useContext(SetDataContext);

export default function FormShell({ children }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useImmer({
    name: "",
    email: "",
    phone: "",
    plan: {
      type: "",
      price: 0,
      monthly: null,
      addOns: [],
      addOnsTotalPrice: 0,
    },
  });

  return (
    <StepContext.Provider value={step}>
      <DataContext.Provider value={data}>
        <SetStepContext.Provider value={setStep}>
          <SetDataContext.Provider value={setData}>
            {children}
          </SetDataContext.Provider>
        </SetStepContext.Provider>
      </DataContext.Provider>
    </StepContext.Provider>
  );
}
