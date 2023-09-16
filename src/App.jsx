import "./App.css";
import FormContent from "./Comp/Form/Form";
import FormShell from "./Comp/Context/GlobalContext";

import bg_image_phone from "./assets/images/bg-sidebar-mobile.svg";

export default function App() {
  return (
    <main>
      <div className="absolute h-max w-screen lg:hidden">
        <img src={bg_image_phone} alt="Background" className="w-screen" />
      </div>
      <section className="lg:m-4 lg:rounded-2xl lg:bg-white lg:p-4 lg:shadow-lg">
        <FormShell children={<FormContent />} />
      </section>
    </main>
  );
}
