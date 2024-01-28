import { React, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./css/Investor.css";

export default function Investor() {
  const Navigate = useNavigate();
  const [business, setBusiness] = useState({
    name: "",
    industry: [""],
    subindustry: "",
    funding: "",
    description: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [searchParams] = useSearchParams();

  useEffect(() => {
    console.log("useEffect");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currId: searchParams.get("id") }),
    };
    console.log(requestOptions.body);
    fetch("http://127.0.0.1:8000/recommend/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("got request back");
        console.log(data);
        setBusiness(data);
      });
  }, []);

  const getBusiness = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currId: searchParams.get("id") }),
    };
    console.log(requestOptions.body);
    fetch("http://127.0.0.1:8000/recommend/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("got request back");
        console.log(data);
        setBusiness(data);
      });
  };

  const nextBusiness = (event) => {
    const jsonIn = {
      target: business._id,
      current: searchParams.get("id"),
      liked: !!String(event.target.value),
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonIn),
    };
    console.log(requestOptions.body);
    fetch("http://127.0.0.1:8000/likebusiness/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        getBusiness();
      });
  };

  if (business == "error code") {
    return (
      <>
        <div>
          <a href="/" className="header">
            Oyster
          </a>
        </div>
        <div className="display-wrapper">
          <div className="business-wrapper">
            <h1 className="business-name">No more businesses!</h1>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <a href="/" className="header">
          Oyster
        </a>
      </div>
      <div className="display-wrapper">
        <div className="business-wrapper">
          <h2 className="business-name">{business.name}</h2>

          <div>
            <h3 className="feature-label">Industry</h3>
            {business.industry.map((industry) => (
              <p className="feature">{business.industry}</p>
            ))}

            <h3 className="feature-label">Sub-Industry</h3>
            <p className="feature">{business.subindustry}</p>
          </div>

          <div>
            <h3 className="feature-label">Funding Stage</h3>
            <p className="feature">{business.funding}</p>
          </div>

          <div>
            <h3 className="feature-label">Business Description</h3>
            <p className="feature">{business.description}</p>
          </div>

          <div>
            <h3 className="feature-label">Contact Details</h3>
            <p className="feature">
              {business.firstName} {business.lastName} {business.email}
            </p>
          </div>
          <div>
            <button
              onClick={nextBusiness}
              value=""
              className="choice-button no-button"
            >
              <img value="" className="icon-img" src="/ximage.png"></img>
            </button>
            <button
              onClick={nextBusiness}
              value=" "
              className="choice-button yes-button"
            >
              <img value=" " className="icon-img" src="/money.jpg"></img>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
