import { Children, cloneElement } from "react";
import { useSetStep, useStep } from "../Context/GlobalContext";

import checkmark from "../../assets/images/icon-checkmark.svg";

export function StepNav({ handleAdvance, valid = true, desktop = false }) {
  const [step, setStep] = [useStep(), useSetStep()];

  return (
    <div
      className={`flex bg-white p-4 font-medium lg:flex ${
        desktop
          ? "hidden w-full lg:col-start-2 lg:block lg:place-self-end lg:px-24"
          : "w-screen lg:hidden"
      } ${step === 1 ? "justify-end lg:px-24" : "justify-between"}`}
    >
      <button
        className={`items-center tracking-tight text-coolGray lg:text-[1.125rem] lg:hover:text-marine/90 ${
          step === 1 && "hidden"
        }`}
        onClick={() => setStep((step) => step - 1)}
      >
        Go Back
      </button>
      <button
        className={`rounded-md bg-marine px-5 py-3 text-white disabled:bg-marine/50 lg:px-6 lg:tracking-wide${
          valid ? " lg:hover:bg-marine_hover" : ""
        }`}
        onClick={handleAdvance}
        disabled={!valid}
      >
        Next Step
      </button>
    </div>
  );
}

export function Confirm({ isComplete, desktop = false }) {
  const setStep = useSetStep();

  return (
    <div
      className={`flex justify-between bg-white p-4 font-medium lg:flex ${
        desktop
          ? "hidden w-full lg:col-start-2 lg:block lg:place-self-end lg:px-24"
          : "w-screen lg:hidden"
      }`}
    >
      <button
        className="items-center tracking-tight text-coolGray lg:text-[1.125rem] lg:hover:text-marine/90"
        onClick={() => setStep((step) => step - 1)}
      >
        Go Back
      </button>
      <button
        id="confirm"
        className="rounded-md bg-purplish px-6 py-3
            text-white lg:px-8 lg:tracking-wide lg:hover:bg-purplish/60"
        onClick={() => {
          isComplete(true);
        }}
      >
        Confirm
      </button>
    </div>
  );
}

export function RadioGroup({ onChange, type, children }) {
  const RadioButtons = Children.map(children, (child) => {
    return cloneElement(child, {
      onChange,
      checked: child.props.value === type,
    });
  });
  return (
    <div className="my-5 flex flex-col gap-4 lg:mb-8 lg:mt-10 lg:flex-row">
      {RadioButtons}
    </div>
  );
}

export function RadioButton({ value, checked, onChange, children }) {
  return (
    <label
      htmlFor={value}
      className={`w-full cursor-pointer rounded-lg border px-4 lg:hover:border-purplish py-4${
        checked ? " border-purplish bg-radioGray" : " border-lightGray"
      }`}
    >
      <input
        className="hidden"
        id={value}
        type="radio"
        name={value}
        value={value}
        checked={checked}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      {children}
    </label>
  );
}

export function CheckboxGroup({ onChange, type, children }) {
  const RadioButtons = Children.map(children, (child) => {
    return cloneElement(child, {
      onChange,
      checked: type.indexOf(child.props.value) !== -1,
    });
  });
  return <div className="my-5 flex flex-col gap-4 lg:my-8">{RadioButtons}</div>;
}

export function CheckboxButton({ value, checked, onChange, children }) {
  return (
    <label
      htmlFor={value}
      className={`flex w-full cursor-pointer items-center rounded-lg border px-4 py-3 lg:px-5 lg:py-4 lg:hover:border-purplish ${
        checked ? "border-purplish bg-radioGray" : "border-lightGray"
      }`}
    >
      <input
        className="hidden h-4 w-4 accent-purplish"
        id={value}
        type="checkbox"
        name={value}
        value={value}
        checked={checked}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <span
        className={`grid h-5 w-5 place-items-center lg:mr-2 rounded-[0.25rem]${
          checked ? " bg-purplish" : " border border-lightGray"
        }`}
      >
        <img src={checkmark} alt="checkmark" />
      </span>
      {children}
    </label>
  );
}
