import React, { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then(console.log)
            .catch(console.error);
    };

    return (
        <div className="row mt-5">
            <div className="col-12 col-md-7">
                <div className="card shadow-lg p-3">
                    <label htmlFor="email">Email:</label>
                    <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="password">Password:</label>
                    <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <button onClick={handleLogin} className="btn btn-submit">
                        Login!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
