import React from "react";
import "./css/Home.css";

export default function Home() {
  return (
    <div className="on-load">
      <h1 href="/" className="main-title">
        Oyster
      </h1>
      <a className="link-button" href="/businessform">
        Business
      </a>
      <a className="link-button" href="/investorform">
        Investor
      </a>
    </div>
  );
}
