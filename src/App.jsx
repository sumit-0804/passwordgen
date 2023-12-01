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
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
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
          <div className="p-12 px-16 border-2 rounded-lg border-black container">
            <div className="header ">
              <h2 className="text-xl text-center font-bold underline pb-6">
                Password Generator
              </h2>
            </div>
            <div className="border-2 rounded border-black flex flex-wrap justify-between content-center">
              <h3 className="break-all">{password}</h3>
              <Button onClick={handleCopyPassword} variant="text">
                <i
                  className="p-0.5 fa-regular fa-clipboard"
                  style={{ color: "black", fontSize: "20px" }}
                ></i>
              </Button>
            </div>
            <div className="form-group text-center py-4">
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
            <div className="flex justify-center content-center">
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
            </div>
            <div className="flex justify-center">
              <Button
                onClick={handleGeneratePassword}
                variant="contained"
                sx={{
                  background: "linear-gradient(45deg, #06b6d4, #1e40af )",
                  borderRadius: "5px",
                  marginTop: "4px",
                  textAlign: "center",
                  border: "2px",
                  color: "white",
                  transition: "box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "0 6px 10px 4px rgba(255, 51, 102, 0.3)",
                  },
                }}
              >
                Generate Password
              </Button>
            </div>
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
