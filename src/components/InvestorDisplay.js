import React from "react";
import "./investorDisplay.css";

export default function InvestorDisplay(props) {
  return (
    <div className="make-round">
      <div className="investor-card">
        <h2 className="investor-name">{props.name}</h2>
        <h3 className="subtitle">Investor Description</h3>
        <p className="long-description">{props.description}</p>
        <h3 className="subtitle">Investor Contact</h3>
        <h4 className="subtext">{props.firstName}</h4>
        <h4 className="subtext">{props.lastName}</h4>
        <h4 className="subtext email">{props.email}</h4>
      </div>
    </div>
  );
}
