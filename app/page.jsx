

"use client";

import Image from "next/image";

import { useState, useEffect } from "react";
import { currency } from "@/api/currency";
import { motion } from "framer-motion";

export default function Home() {
  const [toCurrency, setToCurrency] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [money, setMoney] = useState("");
  const [result, setResult] = useState("");
  const [Currencies, setCurrencies] = useState([]);

  useEffect(() => {
      currency.allCurrenciesList()
        .then(r => {
          setCurrencies(r.currencies)
        })
        .catch(e => console.log(e));
  }, []);

  function handleClick() {
    console.log(toCurrency, fromCurrency, money);
    currency
      .convertCurrency(toCurrency, fromCurrency, money)
      .then((r) => {
        setResult(r.value.toFixed(2));
      })
      .catch((e) => console.log(e));
  }

  return (
    <motion.div
      className="flex flex-col h-screen bg-green-600 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >

      
      <div className="flex flex-col items-center justify-center h-full space-y-8">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          
          <h1 className="text-3xl font-bold mt-4">
            Convert the currencies of the world <br /> brother with my solution
          </h1>
        </motion.div>
        <motion.div
          className="sm:w-96 bg-white/20 backdrop-blur-lg px-10 py-6 rounded-2xl flex flex-col items-center shadow-xl space-y-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="grid grid-cols-2 gap-4 w-full">
            <select
              onChange={(e) => setFromCurrency(e.target.value)}
              className="text-black w-full p-2 border border-gray-300 rounded-md bg-white/70 focus:ring-2 focus:ring-green-500 transition"
            >
              <option value="">Pick One</option>
              {Currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>

            <select
              onChange={(e) => setToCurrency(e.target.value)}
              className="text-black w-full p-2 border border-gray-300 rounded-md bg-white/70 focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">Pick One</option>
              {Currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md text-black bg-white/70 focus:ring-2 focus:ring-purple-500 transition"
            placeholder="Value"
            onChange={(e) => setMoney(e.target.value)}
          />

          {/* Static result box (no motion when updated) */}
          <div className="w-full text-black text-center bg-white/60 p-2 rounded-md shadow-md">
            {result ? result : "Converted value will appear here"}
          </div>

          {/* 🔘 Smooth Button Press Effect */}
          <motion.button
            className="text-white bg-green-600 px-4 py-2 rounded-md shadow-md"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1, backgroundColor: "#16a34a" }}
            transition={{ duration: 0.2 }}
            onClick={handleClick}
          >
            Convert
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}