import { useCallback, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useImmer } from "use-immer";
import * as Yup from "yup";

import { useSetStep, useSetData, useData } from "../Context/GlobalContext";
import {
  StepNav,
  Confirm,
  RadioButton,
  RadioGroup,
  CheckboxGroup,
  CheckboxButton,
} from "../Button & Menu/Selection";
import { plans, addOns } from "../Data/data";

import "./Pages.css";
import thank_icon from "../../assets/images/icon-thank-you.svg";

function phoneMask(phone) {
  return phone.length;
}

export function Page1() {
  const data = useData();

  const setStep = useSetStep();
  const setData = useSetData();

  const preventDefault = useCallback((e, isValid, values) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      e.preventDefault();
      if (isValid) handleAdvance(values);
    }
  });

  const handleAdvance = (values) => {
    setStep((step) => step + 1);
    setData((draft) => {
      draft.name = values.name;
      draft.email = values.email;
      draft.phone = values.phone;
    });
  };

  return (
    <Formik
      initialValues={{
        name: data.name.length === 0 ? "" : data.name,
        email: data.email.length === 0 ? "" : data.email,
        phone: data.phone.length === 0 ? "" : data.phone,
      }}
      onSubmit={(values) => console.log(values)}
      validationSchema={Yup.object({
        name: Yup.string().required("This field is required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("This field is required"),
        phone: Yup.string()
          .matches(/^\+[1-9](?:[0-9]\x20?){5,13}[0-9]$/, {
            message: "Invalid phone number",
            excludeEmptyString: true,
          })
          .required("This field is required"),
      })}
      validateOnMount
    >
      {({
        errors,
        touched,
        values,
        isValid,
        setFieldTouched,
        setFieldValue,
        handleChange,
      }) => (
        <>
          <Form
            className="flex grow flex-col"
            onKeyDown={(e) => preventDefault(e, isValid, values)}
          >
            <section className="mx-4 mb-12 flex h-full grow justify-center lg:mx-0 lg:flex-col">
              <div className="h-max grow rounded-lg bg-white p-6 shadow-lg lg:rounded-none lg:px-24 lg:shadow-none">
                <h1 className="mb-3 mt-2 text-2xl font-bold text-marine lg:text-[2rem]">
                  Personal info
                </h1>
                <p className="font-regular text-base text-coolGray">
                  Please provide your name, email address, and phone number.
                </p>
                <label className="font-medium">
                  <section className="mb-1 mt-4 flex justify-between lg:mb-2 lg:mt-8">
                    <p className="text-sm text-marine lg:text-[1rem]">Name</p>
                    {errors.name && touched.name && (
                      <p className="text-sm font-bold text-strawberry lg:text-[1rem]">
                        {errors.name}
                      </p>
                    )}
                  </section>
                  <Field
                    type="text"
                    name="name"
                    placeholder="e.g. Stephen King"
                    className={`form-input${
                      errors.name && touched.name
                        ? " border border-strawberry"
                        : ""
                    }`}
                    onChange={(e) => {
                      setFieldValue("name", e.target.value);
                      setFieldTouched("name", true);
                      handleChange(e);
                    }}
                  />
                </label>
                <label className="font-medium">
                  <section className="mb-1 mt-4 flex justify-between lg:mb-2 lg:mt-6">
                    <p className="text-sm text-marine lg:text-[1rem]">
                      Email Address
                    </p>
                    {errors.email && touched.email && (
                      <p className="text-sm font-bold text-strawberry lg:text-[1rem]">
                        {errors.email}
                      </p>
                    )}
                  </section>
                  <Field
                    type="text"
                    name="email"
                    placeholder="e.g. stephenking@lorem.com"
                    className={`form-input${
                      errors.email && touched.email
                        ? " border border-strawberry"
                        : ""
                    }`}
                    onChange={(e) => {
                      setFieldValue("email", e.target.value);
                      setFieldTouched("email", true);
                      handleChange(e);
                    }}
                  />
                </label>
                <label className="font-medium">
                  <section className="mb-1 mt-4 flex justify-between lg:mb-2 lg:mt-6">
                    <p className="text-sm text-marine lg:text-[1rem]">
                      Phone Number
                    </p>
                    {errors.phone && touched.phone && (
                      <p className="text-sm font-bold text-strawberry lg:text-[1rem]">
                        {errors.phone}
                      </p>
                    )}
                  </section>
                  <Field
                    type="text"
                    name="phone"
                    placeholder="e.g. +1 234 567 890"
                    className={`form-input${
                      errors.phone && touched.phone
                        ? " border border-strawberry"
                        : ""
                    }`}
                    onChange={(e) => {
                      setFieldValue("phone", e.target.value, true);
                      setFieldTouched("phone", true);
                      handleChange(e);
                    }}
                  />
                </label>
              </div>
            </section>
            <StepNav
              handleAdvance={() => handleAdvance(values)}
              valid={isValid}
            />
          </Form>
          <StepNav
            handleAdvance={() => handleAdvance(values)}
            valid={isValid}
            desktop={true}
          />
        </>
      )}
    </Formik>
  );
}

export function Page2() {
  const startingType =
    useData().plan.type.length === 0 ? "Arcade" : useData().plan.type;

  const startingCycle =
    useData().plan.monthly === null ? true : useData().plan.monthly;

  const [type, setType] = useState(startingType);
  const [monthly, setMonthly] = useState(startingCycle);

  const setStep = useSetStep();
  const setData = useSetData();

  const handleAdvance = () => {
    setStep((step) => step + 1);
    setData((draft) => {
      const price = plans.filter((plan) => plan.name === type)[0].monthly_price;
      draft.plan.type = type;
      draft.plan.price = monthly ? price : price * 10;
      draft.plan.monthly = monthly;
    });
  };

  const handleKeyAdvance = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) handleAdvance();
  };

  useEffect(() => {
    window.addEventListener("keypress", handleKeyAdvance);

    return () => window.removeEventListener("keypress", handleKeyAdvance);
  }, [handleKeyAdvance]);

  return (
    <>
      <div className="flex grow flex-col">
        <section className="mx-4 mb-10 flex h-full grow justify-center lg:mx-0 lg:flex-col">
          <div className="h-max grow rounded-lg bg-white p-6 shadow-lg lg:rounded-none lg:px-24 lg:shadow-none">
            <h1 className="mb-3 mt-2 text-2xl font-bold text-marine lg:text-[2rem]">
              Select your plan
            </h1>
            <p className="font-regular text-base text-coolGray">
              You have the option of monthly or yearly billing.
            </p>
            <RadioGroup onChange={setType} type={type}>
              {plans.map((plan) => (
                <RadioButton value={plan.name} key={plan.name}>
                  <article
                    className={`flex gap-4 tracking-tight lg:flex-col lg:gap-10${
                      monthly && plan.name !== "Advanced"
                        ? " lg:pr-[3.5rem]"
                        : " lg:pr-8"
                    }`}
                  >
                    <img
                      src={plan.icon}
                      alt={`${plan.name} Pack Icon`}
                      className="h-max lg:w-fit"
                    />
                    <div className="flex flex-col gap-1">
                      <p className="text-[1.125rem] font-bold leading-4 text-marine">
                        {plan.name}
                      </p>
                      <p className="font-regular text-coolGray">{`${
                        monthly
                          ? `$${plan.monthly_price}/mo`
                          : `$${plan.monthly_price * 10}/yr`
                      }`}</p>
                      {!monthly && (
                        <p className="text-sm font-medium text-marine">
                          2 months free
                        </p>
                      )}
                    </div>
                  </article>
                </RadioButton>
              ))}
            </RadioGroup>
            <div className="mb-4 mt-6 flex w-full items-center justify-center gap-6 rounded-md bg-radioGray py-2 font-bold tracking-tight lg:py-3 lg:text-[1.125rem]">
              <p className={`${monthly ? "text-marine" : "text-coolGray"}`}>
                Monthly
              </p>
              <div className="toggle-switch">
                <label className="switch-label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={monthly}
                    onChange={(e) => setMonthly(e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <p className={`${!monthly ? "text-marine" : "text-coolGray"}`}>
                Yearly
              </p>
            </div>
          </div>
        </section>
        <StepNav handleAdvance={handleAdvance} />
      </div>
      <StepNav handleAdvance={handleAdvance} desktop={true} />
    </>
  );
}

export function Page3() {
  const startingAddOns =
    useData().plan.addOns.length === 0
      ? ["Online service", "Larger storage"]
      : useData().plan.addOns;

  const [add_ons, setAdd_ons] = useImmer(startingAddOns);

  const isMonthly = useData().plan.monthly;

  const setStep = useSetStep();
  const setData = useSetData();

  const handleAddOns = (value) => {
    setAdd_ons((draft) => {
      if (draft.indexOf(value) === -1) draft.push(value);
      else return draft.filter((item) => item !== value);
    });
  };

  const handleAdvance = () => {
    setStep((step) => step + 1);
    setData((draft) => {
      const price = addOns
        .filter((add_on) => add_ons.indexOf(add_on.name) !== -1)
        .map((add_on) => add_on.monthly_price)
        .reduce((prevValue, currValue) => prevValue + currValue, 0);

      draft.plan.addOns = add_ons;
      draft.plan.addOnsTotalPrice = isMonthly ? price : price * 10;
    });
  };

  const handleKeyAdvance = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) handleAdvance();
  };

  useEffect(() => {
    window.addEventListener("keypress", handleKeyAdvance);

    return () => window.removeEventListener("keypress", handleKeyAdvance);
  }, [handleKeyAdvance]);

  return (
    <>
      <div className="flex grow flex-col">
        <section className="mx-4 mb-8 grow">
          <div className="w-full rounded-lg bg-white p-6 shadow-lg lg:rounded-none lg:px-24 lg:shadow-none">
            <h1 className="mb-3 mt-2 text-2xl font-bold text-marine lg:text-[2rem]">
              Pick add-ons
            </h1>
            <p className="font-regular text-base text-coolGray">
              Add-ons help enhance your gaming experience.
            </p>
            <CheckboxGroup onChange={handleAddOns} type={add_ons}>
              {addOns.map((addOn) => (
                <CheckboxButton value={addOn.name} key={addOn.name}>
                  <div className="ml-3.5 grow font-medium leading-5 lg:mr-32">
                    <p className="text-[1rem] font-bold tracking-tight text-marine/90 lg:mb-1 lg:text-[1.05rem]">
                      {addOn.name}
                    </p>
                    <p className="-mr-1 text-[0.8rem] tracking-normal text-coolGray lg:font-regular lg:text-[0.9rem]">
                      {addOn.description}
                    </p>
                  </div>
                  <p className="ml-2 text-[0.8rem] font-medium tracking-tight text-purplish lg:text-[1rem]">
                    {isMonthly
                      ? `+$${addOn.monthly_price}/mo`
                      : `+$${addOn.monthly_price * 10}/yr`}
                  </p>
                </CheckboxButton>
              ))}
            </CheckboxGroup>
          </div>
        </section>
        <StepNav handleAdvance={handleAdvance} />
      </div>
      <StepNav handleAdvance={handleAdvance} desktop={true} />
    </>
  );
}

export function Page4({ setComplete }) {
  const data = useData();

  const setStep = useSetStep();

  const handleKeyAdvance = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      const confirm = document.getElementById("confirm");
      confirm.click();
    }
  };

  useEffect(() => {
    window.addEventListener("keypress", handleKeyAdvance);

    return () => window.removeEventListener("keypress", handleKeyAdvance);
  }, [handleKeyAdvance]);

  return (
    <>
      <div className="flex grow flex-col">
        <section className="mx-4 mb-8 grow">
          <div className="w-full rounded-lg bg-white p-6 shadow-lg lg:rounded-none lg:px-24 lg:shadow-none">
            <h1 className="mb-3 mt-2 text-2xl font-bold text-marine lg:text-[2rem]">
              Finishing up
            </h1>
            <p className="font-regular text-base text-coolGray">
              Double-check everything looks OK before confirming.
            </p>
            <article className="my-4 rounded-md bg-radioGray p-4 font-regular tracking-tight lg:mt-10 lg:p-6">
              <section className="mb-4 flex items-center justify-between leading-[1.3rem] lg:justify-start lg:gap-[14rem] lg:leading-[1.4rem]">
                <div>
                  <p className="font-bold text-marine/90 lg:text-[1.15rem]">
                    {data.plan.type} ({data.plan.monthly ? "Monthly" : "Yearly"}
                    )
                  </p>
                  <button
                    className="text-coolGray underline decoration-2 underline-offset-2"
                    onClick={() => setStep(2)}
                  >
                    Change
                  </button>
                </div>
                <p className="font-bold text-marine/90 lg:text-[1.25rem]">
                  {data.plan.monthly
                    ? `$${data.plan.price}/mo`
                    : `$${data.plan.price}/yr`}
                </p>
              </section>
              <hr />
              <section className="mt-4 flex flex-col gap-3 leading-[1.3rem]">
                {data.plan.addOns.map((addOn) => {
                  const price = addOns.filter(
                    (add_on) => add_on.name === addOn
                  )[0].monthly_price;

                  return (
                    <div
                      key={addOn}
                      className="mb-1 flex items-center justify-between font-regular text-coolGray"
                    >
                      <p>{addOn}</p>
                      <p className="font-medium text-marine/90 lg:text-[1rem]">
                        {data.plan.monthly
                          ? `+$${price}/mo`
                          : `+$${price * 10}/yr`}
                      </p>
                    </div>
                  );
                })}
              </section>
            </article>
            <div className="flex items-center justify-between px-4 py-2 font-regular tracking-tight text-coolGray">
              <p>Total (per {data.plan.monthly ? "month" : "year"})</p>
              <p className="text-[1.2rem] font-bold text-purplish lg:text-[1.55rem]">
                ${data.plan.price + data.plan.addOnsTotalPrice}/
                {data.plan.monthly ? "mo" : "yr"}
              </p>
            </div>
          </div>
        </section>
        <Confirm isComplete={setComplete} />
      </div>
      <Confirm isComplete={setComplete} desktop={true} />
    </>
  );
}

export function ThankYouPage() {
  return (
    <div className="flex grow flex-col lg:row-span-2 lg:h-full lg:w-[40rem]">
      <section className="mx-4 mb-8 grow tracking-tight lg:flex lg:items-center">
        <div className="thank-you">
          <img
            src={thank_icon}
            alt="Thank You Icon"
            className="scale-75 lg:mb-3 lg:scale-90"
          />
          <h1 className="mt-1 text-[1.5rem] font-bold text-marine/95 lg:mb-2 lg:text-[2rem]">
            Thank you!
          </h1>
          <p className="text-center text-[1rem] font-medium text-coolGray/80 lg:me-2 lg:ms-2">
            Thanks for confirming your subscription! We hope you have fun using
            our platform. If you ever need support, please feel free to email us
            at support@loremgaming.com.
          </p>
        </div>
      </section>
    </div>
  );
}
