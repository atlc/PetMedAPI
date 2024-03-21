import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Navbar from "./components/Navbar";
import Verify from "./views/Verify";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <main className="container">
                <Routes>
                    <Route path="/" element={<h1>Welcome to PetMed!</h1>} />
                    <Route path="/verify" element={<Verify />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
};

export default App;
