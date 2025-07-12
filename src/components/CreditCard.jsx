import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useRef, useState } from "react";
import { formatCVC, formatCreditCardNumber, formatExpirationDate } from "../utils/card-util.js";
import Cards from "react-credit-cards-2";
import { useKeyPress } from "../hooks/useKeyPress";

const CreditCard = ({submitHandler}) => {

  const formRef = useRef(null);
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: undefined,
  });

  const handleInputChange = (ev) => {
    const target = ev.target;
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    setState((val) => ({
      ...val,
      ...{ [target.name]: target.value },
    }));
  };

  const handleInputFocus = (evt) => {
    const target = evt.target;
    const targetName = target.name;
    setState((prev) => ({ ...prev, focus: targetName }));
  };

  const setInputValue = (inputName, value) => {
    const target = formRef.current?.elements.namedItem(
      inputName
    );
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    ).set;
    nativeInputValueSetter.call(target, value);
    const inputEvent = new Event('input', {bubbles: true});
    target.dispatchEvent(inputEvent);
  }

  useKeyPress('H', () => {
    console.log('special key pressed');
    setInputValue('number', '2222 2222 2222 2222');
    setInputValue('cvc', '123');
    setInputValue('expiry', '12/25');
    setInputValue('name', 'Wajahat Ali');
  });

  return (
    <form ref={formRef} onSubmit={(ev) => {
      ev.preventDefault();
      const {focus, ...restOfTheState} = state;
      submitHandler(restOfTheState);
    }} className="flex flex-col gap-4 items-center">
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      <div className="form-inputs w-full px-8 flex flex-col gap-4">
        <div className="flex flex-col gap-2 w-full">
          <input
            type="text"
            name="number"
            placeholder="Card Number"
            pattern="^(\d\s?){16}(?=\D*$)|(\d\s?){19}(?=\D*$)$"
            required
            className="input input-bordered w-full max-w-xs"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <small>Eg: XXXX XXXX XXXX XXXX(XXX)</small>
        </div>
        <div>
          <input
            type="text"
            name="name"
            className="input input-bordered w-full max-w-xs"
            placeholder="Name"
            required
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </div>
        <div>
          <input
            type="tel"
            name="expiry"
            className="input input-bordered w-full max-w-xs"
            placeholder="Valid Thru (MM/YY)"
            pattern="^(0[1-9]|1[0-2])\/\d{2}$"
            required
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </div>
        <div>
          <input
            type="tel"
            name="cvc"
            className="input input-bordered w-full max-w-xs"
            placeholder="CVC"
            pattern="\d{3,4}"
            required
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </div>
      </div>
      <div className="form-actions w-44">
        <button type="submit" className="btn btn-block btn-sm md:btn-md ml-4 bg-gradient-to-r from-[#FF9E00] to-[#FFB347] text-[#240046] font-semibold tracking-wide text-base shadow-md hover:ring-[#FF9E00] hover:from-[#FFA931] hover:to-[#FFD580] transform transition duration-300 ease-in-out">
          PAY
        </button>
      </div>{" "}
      <small className="text-center italic text-xs">
        Press Ctrl + Shift + H to fill the form with fake values
      </small>
    </form>
  );
}

export default CreditCard;

