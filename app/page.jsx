"use client";
import { NavBar } from "../components/navbar/Navbar";
import Image from "next/image";
import logo from "./../components/navbar/images/logo.png"
import { useState, useEffect } from "react";
import { currency } from "@/api/currency";

export default function Home() {
  const [toCurrency, setToCurrency] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [money, setMoney] = useState('');
  const [result, setResult] = useState('');
  const [Currencies, setCurrencies] = useState([]);
  useEffect(() => {
    currency.getAllContries()
      .then((response) => {
        const currencies = response.countries.map(countrie => countrie.currency);
        const uniqueValue = [...new Set(currencies)];
        setCurrencies(uniqueValue);
      })
      .catch(e => console.log("Error fetching currencies:", e));
  }, []);



  function handleClick() {
    console.log(toCurrency, fromCurrency, money)
    currency.convertCurrency(toCurrency, fromCurrency, money)
      .then(r => {
        setResult(r.value.toFixed(2));
      })
      .catch(e => console.log(e));
  };

  return (
    <div className="flex flex-col h-screen bg-green-400 text-white ">
      <NavBar />
      <div className="flex items-center flex-col">
        <div className="flex  pl-10 m-20 items-center ">
          <Image src={logo} width={200} height={200} alt="logo" />
          <h1 className="text-3xl pl-20">Convert the currencies of the world <br /> brother with my solution</h1>
        </div>
        <div className="sm:w-200 bg-white w-10 sm:h-80 rounded-2xl">
          <div name="currency-to-convert">
            <select onChange={(e) => setFromCurrency(e.target.value)} className="text-black">
              <option value="">Pick One</option>
              {Currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="w-40 h-10 text-black border-1 border-black"
              placeholder="value"
              onChange={(e) => setMoney(e.target.value)}
            />

          </div>
          <div name="currency-to-currency">

            <select onChange={(e) => setToCurrency(e.target.value)} className="text-black">
              <option value="">Pick One</option>
              {Currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            <div className="bg-sky-50 h-20 w-50 text-black">
              {result ? result : "Converted value will appear here"}
            </div>
          </div>
          <button className="text-white bg-green-600 p-2 rounded-2xl" onClick={handleClick}>
            <p>
              converted
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
