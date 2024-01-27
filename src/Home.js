import React from "react";
import "./css/Home.css";

export default function Home() {
  return (
    <div>
      <h1 className="main-title">Oyster</h1>
      <h3 className="description">
        Making small and micro businesses into pearls
      </h3>
      <a className="link-button" href="/businessform">
        Business
      </a>
      <a className="link-button" href="/investorform">
        Investor
      </a>
    </div>
  );
}
