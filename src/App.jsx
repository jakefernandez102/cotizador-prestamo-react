import { useState, useEffect } from "react";
import { Buttons } from "./components/Buttons";
import { Header } from "./components/Header";
import { calculateTotalToPay, formatMoney } from "./helpers";



function App () {

  const [ quantity, setQuantity ] = useState( 10000 );
  const [ months, setMonths ] = useState( 6 );
  const [ total, setTotal ] = useState( 0 );
  const [ payment, setPayment ] = useState( 0 );

  useEffect( () => {
    setTotal( calculateTotalToPay( quantity, months ) );

  }, [ quantity, months ] );

  useEffect( () => {
    //calcular pago mensual
    setPayment( total / months );

  }, [ total ] );

  const MIN = 0;
  const MAX = 20000;
  const STEP = 100;

  const handleChange = ( e => {

    setQuantity( +e.target.value );

  } );

  const handleClickDecrement = () => {
    const value = quantity - STEP;

    if ( value < MIN ) {
      alert( 'Not alowed quantity' );
      return;
    }

    setQuantity( value );
  };

  const handleClickIncrement = () => {
    const value = quantity + STEP;

    if ( value > 20000 ) {
      alert( 'Max value 20000' );
      return;
    }

    setQuantity( value );
  };
  const handleChangeSelect = ( e ) => {
    setMonths( +e.target.value );
  };

  return (
    <>
      <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
        <Header />

        <div className="flex justify-between my-6">
          <Buttons
            operador='-'
            fn={ handleClickDecrement }
          />

          <Buttons
            operador='+'
            fn={ handleClickIncrement }
          />

        </div>

        <input
          type="range"
          className="w-full h-6 bg-gray-200 accent-lime-500"
          onChange={ handleChange }
          min={ MIN }
          max={ MAX }
          step={ STEP }
          value={ quantity }
        />
        <p className="text-center my-10 text-5xl font-extrabold text-indigo-600">
          { formatMoney( quantity ) }
        </p>

        <h2 className="text-2xl font-extrabold text-gray-500 text-center">
          Select a <span className="text-indigo-600">time period</span> to pay
        </h2>

        <select
          name="time-period"
          id="time-period"
          className="mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500"
          value={ months }
          onChange={ handleChangeSelect }
        >

          <option value="6">6 Months</option>
          <option value="12">12 Months</option>
          <option value="24">24 Months</option>

        </select>

        <div
          className="my-5 space-y-3 bg-gray-50 p-5"
        >
          <h2 className="text-2xl font-extrabold text-gray-500 text-center">
            Sumary <span className="text-indigo-600">of payments</span>
          </h2>

          <p className="text-xl text-gray-500 text-center font-bold">{ months } Months</p>
          <p className="text-xl text-gray-500 text-center font-bold">{ formatMoney( total ) } Total to be payed</p>
          <p className="text-xl text-gray-500 text-center font-bold">{ formatMoney( payment ) } Monthly fee</p>

        </div>

      </div>
    </>
  );
}

export default App;
