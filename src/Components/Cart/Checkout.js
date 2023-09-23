import styles from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";
const isFiveChar = (value) => value.length === 5;


const Checkout = (props) => {
  const [userInputValidity, setUserInputValidity] = useState({
    name: true,
    at: true,
    city: true,
    state: true,
    pincode: true
  });

  const nameInputRef = useRef();
  const atInputRef = useRef();
  const cityInputRef = useRef();
  const stateInputRef = useRef();
  const pincodeInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
  
    const enteredName = nameInputRef.current.value;
    const enteredAt = atInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredState = stateInputRef.current.value;
    const enteredPincode = pincodeInputRef.current.value;
  
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredAtIsValid = !isEmpty(enteredAt);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredStateIsValid = !isEmpty(enteredState);
    const enteredPincodeIsValid = !isFiveChar(enteredPincode);

    setUserInputValidity({
      name: enteredNameIsValid,
      at: enteredAtIsValid,
      city: enteredCityIsValid,
      state: enteredStateIsValid,
      pincode: enteredPincodeIsValid
    });
  
    const formIsValid =
      enteredNameIsValid &&
      enteredAtIsValid &&
      enteredCityIsValid &&
      enteredStateIsValid &&
      enteredPincodeIsValid;
  
      if(!formIsValid){
        return;
      }

      props.onConfirm({
        name: enteredName,
        at: enteredAt,
        city: enteredCity,
        state: enteredState,
        pincode: enteredPincode
      });
  };

  const nameControlClasses = `${styles.control} ${userInputValidity.name ? '' : styles.invalid}`;
  const atControlClasses = `${styles.control} ${userInputValidity.at ? '' : styles.invalid}`;
  const cityControlClasses = `${styles.control} ${userInputValidity.city ? '' : styles.invalid}`;
  const stateControlClasses = `${styles.control} ${userInputValidity.state ? '' : styles.invalid}`;
  const pincodeControlClasses = `${styles.control} ${userInputValidity.pincode ? '' : styles.invalid}`;

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="yourname">Your Name</label>
        <input type="text" id="yourname" ref={nameInputRef} />
      </div>
      {!userInputValidity.name && <p style={{color: 'red'}}>Please enter a valid name</p>}
      <div className={atControlClasses}>
        <label htmlFor="at">At</label>
        <input type="text" id="at" ref={atInputRef} />
      </div>
      {!userInputValidity.at && <p style={{color: 'red'}}>Please enter a valid address</p>}
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
      </div>
      {!userInputValidity.city && <p style={{color: 'red'}}>Please enter a valid City name</p>}
      <div className={stateControlClasses}>
        <label htmlFor="state">State</label>
        <input type="text" id="state" ref={stateInputRef} />
      </div>
      {!userInputValidity.state && <p style={{color: 'red'}}>Please enter a valid state name</p>}
      <div className={pincodeControlClasses}>
        <label htmlFor="pincode">Pincode</label>
        <input type="number" id="pincode" ref={pincodeInputRef} />
      </div>
      {!userInputValidity.pincode && <p style={{color: 'red'}}>Please enter a valid pincode</p>}
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
