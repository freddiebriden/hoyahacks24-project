import { React, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import InvestorDisplay from "./components/InvestorDisplay";
import "./css/business.css";

export default function Business() {
  const [investors, setInvestors] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // get investors from api
    // loading dummy data
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currId: searchParams.get("id") }),
    };
    console.log(requestOptions.body);
    fetch("http://127.0.0.1:8000/getinvestors/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("got request back");
        console.log(data);
        setInvestors(data.investors);
      });
  }, []);

  return (
    <>
      <div>
        <a href="/" className="header">
          Oyster
        </a>
      </div>
      <div className="display-wrapper">
        <h1 className="investor-titles">Interested Investors</h1>
        <div className="investors-list">
          {investors.map((investors) => (
            <InvestorDisplay
              name={investors.name}
              description={investors.description}
              firstName={investors.firstName}
              lastName={investors.lastName}
              email={investors.email}
            />
          ))}
        </div>
      </div>
    </>
  );
}
