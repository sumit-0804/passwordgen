import React, { useState } from "react";
import {
  numbers,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters,
} from "./Character";
import { toast, ToastContainer } from "react-toastify";
import { failCopy, successfullyCopy } from "./Message";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { grey } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(26);
  const [includeUpperCase, setIncludeUpperCase] = useState(false);
  const [includeLowerCase, setIncludeLowerCase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  const handleGeneratePassword = () => {
    if (
      !includeLowerCase &&
      !includeNumbers &&
      !includeUpperCase &&
      !includeSymbols
    ) {
      notify("To Generate Password you must select atleast 1 checkbox", true);
    } else {
      let characterList = "";
      if (includeNumbers) characterList += numbers;
      if (includeLowerCase) characterList += lowerCaseLetters;
      if (includeUpperCase) characterList += upperCaseLetters;
      if (includeSymbols) characterList += specialCharacters;
      setPassword(createPassword(characterList));
      notify("Password is generated Successfully!!");
    }
  };

  const createPassword = (characterList) => {
    let password = "";
    const characterListLength = characterList.length;
    for (let i = 0; i < passwordLength; i++) {
      const charIndex = Math.round(Math.random() * characterListLength);
      password += characterList.charAt(charIndex);
    }
    return password;
  };

  const copyToClipboard = (password) => {
    navigator.clipboard.writeText(password);
  };

  const handleCopyPassword = (e) => {
    if (password === "") {
      notify(failCopy, true);
    } else {
      copyToClipboard(password);
      notify(successfullyCopy);
    }
  };

  return (
    <>
      <div className="main my-20 flex justify-center ">
        <div className="App">
          <div className="p-12 px-16 border-2 rounded-lg bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%  border-grey container">
            <div className="header">
              <h2 className="text-xl font-bold underline pb-6">
                Password Generator
              </h2>
            </div>
            <div className="passwordInput">
              <h3 className="px-4 text-lg">&nbsp;{password}</h3>
            </div>
            <Button
              sx={{
                background: "linear-gradient(45deg, #06b6d4, #1e40af )",
                borderRadius: "3px",
                border: 0,
                color: "white",
                boxShadow: "0 3px 5px 2px rgba(255, 51, 102, 0.3)",
                transition: "box-shadow 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0 6px 10px 4px rgba(255, 51, 102, 0.3)",
                },
              }}
              onClick={handleCopyPassword}
              variant="contained"
            >
              <i className=" py-2 fa-regular fa-copy"></i>
            </Button>
            <div className="form-group py-4">
              <TextField
                id="outlined-basic"
                label="Password-Length"
                variant="outlined"
                defaultValue={passwordLength}
                onChange={(e) => setPasswordLength(e.target.value)}
                type="number"
                name="password-strength"
                max="26"
                min="8"
              />
            </div>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={includeUpperCase}
                    sx={{
                      color: grey[800],
                      "&.Mui-checked": {
                        color: grey[900],
                      },
                    }}
                  />
                }
                label="Include Upper Case"
                onChange={(e) => setIncludeUpperCase(e.target.checked)}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={includeLowerCase}
                    sx={{
                      color: grey[800],
                      "&.Mui-checked": {
                        color: grey[900],
                      },
                    }}
                  />
                }
                label="Include Lower Case"
                onChange={(e) => setIncludeLowerCase(e.target.checked)}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={includeNumbers}
                    sx={{
                      color: grey[800],
                      "&.Mui-checked": {
                        color: grey[900],
                      },
                    }}
                  />
                }
                label="Include Numbers"
                onChange={(e) => setIncludeNumbers(e.target.checked)}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={includeSymbols}
                    sx={{
                      color: grey[800],
                      "&.Mui-checked": {
                        color: grey[900],
                      },
                    }}
                  />
                }
                label="Include Symbols"
                onChange={(e) => setIncludeSymbols(e.target.checked)}
              />
            </FormGroup>

            <Button
              className="my-4"
              onClick={handleGeneratePassword}
              variant="contained"
              sx={{
                background: "linear-gradient(45deg, #06b6d4, #1e40af )",
                borderRadius: "3px",
                border: 0,
                color: "white",
                height: "48px",
                padding: "0 30px",
                boxShadow: "0 3px 5px 2px rgba(255, 51, 102, 0.3)",
                transition: "box-shadow 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0 6px 10px 4px rgba(255, 51, 102, 0.3)",
                },
              }}
            >
              Generate Password
            </Button>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
