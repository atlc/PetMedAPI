import React, { useEffect, useState } from "react";

const Verify = () => {
    const [token, setToken] = useState("nunya");

    useEffect(() => {
        fetch("http://localhost:3000/auth" + window.location.href.replace(window.location.origin, ""))
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.token) {
                    setToken(data.token);
                }
            });
    }, []);

    return <div>Sick! {token}</div>;
};

export default Verify;
