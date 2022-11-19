import React from "react";
import './App.css'
import { Routes, Route } from "react-router-dom";
import MasterProvider from "./context/Providers/MasterProvider";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <div>
      <MasterProvider>
        <Routes>
          <Route exact path="/" element={ <LoginPage /> } />
          <Route path="/register" element={ <RegisterPage /> } />
          {/* <Route path="/account" element={ <AccountPage /> } /> */}
        </Routes>
      </MasterProvider>
    </div>
  );
}

export default App;
