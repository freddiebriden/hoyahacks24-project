import React from "react";
import "./css/Home.css";

export default function Home() {
  return (
    <div>
      <h1 className="main-title">NAME</h1>
      <a className="link-button" href="/businessform">
        Business
      </a>
      <a className="link-button" href="/investorform">
        Investor
      </a>
    </div>
  );
}
