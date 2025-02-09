import React, { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useRef } from "react";

function App() {
  const [password, setPassword] = useState(""); //to store password
  const [isNum, setIsNum] = useState(false); //to Check whether a character is allowed or not
  const [isSpecial, setIsSpecial] = useState(false); // to Check whether Special character is allowed or not
  const [length, setLength] = useState(8); //to store length of the password

  // useRef hook to get reference to the password input field (used for copying)
  const passwordRef = useRef(null);

  /**
   * Function to generate a random password
   * - Uses useCallback to prevent unnecessary re-creations of the function
   * - Dependencies: length, numberAllowed, charAllowed
   */
  const passwordGenerator = useCallback(() => {
    let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Default characters (A-Z, a-z)
    const numbers = "0123456789";
    const special = ".,@*$%^!-_";
    let result = "";
    // Add numbers if allowed
    if (isNum) {
      characters += numbers;
    }
    // Add special characters if allowed
    if (isSpecial) {
      characters += special;
    }
    // Generate the password of the required length
    for (let i = 0; i < length; i++) {
      const ch = characters[Math.floor(Math.random() * characters.length)];
      result += ch;
    }
    setPassword(result);
  }, [length, isNum, isSpecial, setPassword]);
  /**
   * Function to copy the generated password to the clipboard
   * - Uses useCallback to avoid unnecessary re-creation of the function
   */
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select(); // Select the text inside the input field
    passwordRef.current?.setSelectionRange(0, 999); // Select the entire text (fallback)
    window.navigator.clipboard.writeText(password); //copy text to clipboard
  }, [password]);

  /**
   * useEffect to call passwordGenerator whenever dependencies change
   * - Runs automatically when length, numberAllowed, or charAllowed changes
   */
  useEffect(() => {
    passwordGenerator();
  }, [length, isNum, isSpecial, passwordGenerator]);

  return (
    <><div className="h-screen w-full bg-[url('/image.png')] bg-cover bg-center flex justify-center items-center">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-0 backdrop-blur-2xl text-white ">
        <h1 className="text-white text-center my-3 text-3xl font-bold">Password Generator</h1>

        {/* Input field to display generated password */}
        <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button className="cursor-pointer bg-amber-500 text-l text-white p-1 rounded-l" onClick={copyPasswordToClipboard}>Copy</button>
        </div>
        {/* controls for password customization */}
        <div className="flex text-sm gap-x-2">
          {/* password length selector */}
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />

          <label>Length : {length}</label>
          {/* Checkbox to allow numbers in password */}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={isNum}
              id="numberinput"
              onChange={(e) => {
                setIsNum((prev) => !prev);
              }}
            />

            <label htmlFor="numberInput">Numbers</label>

            {/* checkbox to allow special characters in the password */}
            <input
              type="checkbox"
              defaultChecked={isSpecial}
              id="characterInput"
              onChange={(e) => {
                setIsSpecial((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Character</label>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default App;
