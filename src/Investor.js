import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Investor.css";

export default function Investor() {
  const Navigate = useNavigate();
  const [business, setBusiness] = useState();
  var businessName = "Business Name";

  const getBusiness = () => {
    // fetch business here
  };

  useEffect(() => {
    getBusiness();
  });

  const nextBusiness = () => {
    getBusiness();
    Navigate("/business");
  };
  const likeBusiness = () => {
    // like business api endpoint here
    getBusiness();
    Navigate("/business");
  };

  return (
    <>
      <div>
        <a href="/" className="header">
          Oyster
        </a>
      </div>
      <div className="display-wrapper">
        <div className="business-wrapper">
          <h2 className="business-name">{businessName}</h2>

          <div>
            <h3 className="feature-label">Industry</h3>
            <p className="feature">industry in</p>

            <h3 className="feature-label">Sub-Industry</h3>
            <p className="feature">subindustry</p>
          </div>

          <div>
            <h3 className="feature-label">Funding Stage</h3>
            <p className="feature">funding stage</p>
          </div>

          <div>
            <h3 className="feature-label">Business Description</h3>
            <p className="feature">business description</p>
          </div>

          <div>
            <h3 className="feature-label">Contact Details</h3>
            <p className="feature">contact details</p>
          </div>
          <div>
            <button onClick={nextBusiness} className="choice-button no-button">
              <img className="icon-img" src="/ximage.png"></img>
            </button>
            <button onClick={likeBusiness} className="choice-button yes-button">
              <img className="icon-img" src="/money.jpg"></img>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
