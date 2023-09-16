import arcade_icon from "../../assets/images/icon-arcade.svg";
import advanced_icon from "../../assets/images/icon-advanced.svg";
import pro_icon from "../../assets/images/icon-pro.svg";

export const plans = [
  { name: "Arcade", monthly_price: 9, icon: arcade_icon },
  { name: "Advanced", monthly_price: 12, icon: advanced_icon },
  { name: "Pro", monthly_price: 15, icon: pro_icon },
];

export const addOns = [
  {
    name: "Online service",
    description: "Access to multiplayer games",
    monthly_price: 1,
  },
  {
    name: "Larger storage",
    description: "Extra 1TB of cloud save",
    monthly_price: 2,
  },
  {
    name: "Customizable profile",
    description: "Custom theme on your profile",
    monthly_price: 2,
  },
];
