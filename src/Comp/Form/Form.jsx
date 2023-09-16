import { useState } from "react";

import "./Form.css";
import bg_pc from "../../assets/images/bg-sidebar-desktop.svg";
import { useStep } from "../Context/GlobalContext";
import { Page1, Page2, Page3, Page4, ThankYouPage } from "../Pages/Pages";

export default function FormContent() {
  const [complete, isComplete] = useState(false);

  const step = useStep();

  return (
    <div className="pc-form relative z-10 flex min-h-screen w-screen flex-col items-center lg:grid lg:min-h-max lg:w-full lg:items-start">
      <section className="relative lg:row-span-2">
        <img
          src={bg_pc}
          alt="Desktop Sidebar"
          className="relative hidden lg:block"
        />
        <nav className="py-8 lg:absolute lg:left-8 lg:top-0">
          <ul className="flex justify-center gap-4 font-bold text-white lg:flex-col lg:gap-6">
            <section className="flex items-center gap-4">
              <li className={`list-style${step === 1 ? " list-active" : ""}`}>
                1
              </li>
              <div className="hidden lg:block">
                <p className="font-regular text-[0.85rem] uppercase text-coolGray">
                  Step 1
                </p>
                <p className="font-medium uppercase tracking-widest text-alabaster">
                  Your Info
                </p>
              </div>
            </section>
            <section className="flex items-center gap-4">
              <li className={`list-style${step === 2 ? " list-active" : ""}`}>
                2
              </li>
              <div className="hidden lg:block">
                <p className="font-regular text-[0.85rem] uppercase text-coolGray">
                  Step 2
                </p>
                <p className="font-medium uppercase tracking-widest text-alabaster">
                  Select Plan
                </p>
              </div>
            </section>
            <section className="flex items-center gap-4">
              <li className={`list-style${step === 3 ? " list-active" : ""}`}>
                3
              </li>
              <div className="hidden lg:block">
                <p className="font-regular text-[0.85rem] uppercase text-coolGray">
                  Step 3
                </p>
                <p className="font-medium uppercase tracking-widest text-alabaster">
                  Add-ons
                </p>
              </div>
            </section>
            <section className="flex items-center gap-4">
              <li className={`list-style${step === 4 ? " list-active" : ""}`}>
                4
              </li>
              <div className="hidden lg:block">
                <p className="font-regular text-[0.85rem] uppercase text-coolGray">
                  Step 4
                </p>
                <p className="font-medium uppercase tracking-widest text-alabaster">
                  Summary
                </p>
              </div>
            </section>
          </ul>
        </nav>
      </section>
      {step === 1 && <Page1 />}
      {step === 2 && <Page2 />}
      {step === 3 && <Page3 />}
      {step === 4 && !complete && <Page4 setComplete={isComplete} />}
      {complete && <ThankYouPage />}
    </div>
  );
}
