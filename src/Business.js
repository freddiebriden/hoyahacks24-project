import React from "react";
import InvestorDisplay from "./components/InvestorDisplay";

export default function Business() {
  return (
    <>
      <div>
        <a href="/" className="header">
          Oyster
        </a>
      </div>
      <div className="display-wrapper">
        <InvestorDisplay />
      </div>
    </>
  );
}
