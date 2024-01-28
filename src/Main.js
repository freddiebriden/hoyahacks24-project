import React from "react";
import "./css/Home.css";

export default function Main() {
  return (
    <div>
      <h1 className="main-title">Oyster</h1>
      <h3 className="description">
        Turning small and micro businesses into pearls
      </h3>
      <a className="link-button" href="/newhome">
        Register
      </a>
      <a className="link-button" href="/login">
        Login
      </a>
    </div>
  );
}
