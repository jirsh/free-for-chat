import { FC } from "react";

const BurgerButton: FC<{ opened: boolean; setOpened: Function }> = ({
  opened,
  setOpened,
}) => (
  <button
    className="text-gray-500 w-10 h-10 relative focus:outline-none"
    onClick={() => setOpened(!opened)}
  >
    <span className="sr-only">Open main menu</span>
    <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <span
        aria-hidden="true"
        className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
          opened ? "rotate-45" : "-translate-y-1.5"
        }`}
      />
      <span
        aria-hidden="true"
        className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
          opened ? "opacity-0" : ""
        }`}
      />
      <span
        aria-hidden="true"
        className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
          opened ? "-rotate-45" : "translate-y-1.5"
        }`}
      />
    </div>
  </button>
);

export default BurgerButton;
