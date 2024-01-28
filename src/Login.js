import { React, useState } from "react";
import "./css/Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const Navigate = useNavigate();
  const [login, setLogin] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLogin((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    const jsonOut = JSON.stringify(login);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonOut,
    };
    fetch("http://127.0.0.1:8000/login/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.business_bool)
          Navigate({ pathname: "/business", search: "?id=" + data.current });
        else Navigate({ pathname: "/investor", search: "?id=" + data.current });
      });
  };

  return (
    <>
      <div className="on-load">
        <div>
          <a href="/" className="header">
            Oyster
          </a>
        </div>
        <h2>Email</h2>
        <input type="text" name="email" onChange={handleChange} />
        <h2>Password</h2>
        <input type="password" name="password" onChange={handleChange} />
        <div>
          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
