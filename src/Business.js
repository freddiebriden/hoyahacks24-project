import { React, useEffect, useState } from "react";
import InvestorDisplay from "./components/InvestorDisplay";
import "./css/business.css";

export default function Business() {
  const [investors, setInvestors] = useState([]);

  useEffect(() => {
    // get investors from api
    // loading dummy data
    setInvestors([
      {
        name: "business 1",
        description:
          "kasdjvj j j j j h h g idads fas dfsd fsd fssd fsdf sdf sdf sd fdsf sdf sdad v hahj lf lhk  hl sfa  dsf asdf as fasd fas fasfs fas fsdfda hl kjf sda sdfsa asdfsd f asdf asfdasdf asf a  hlkj fh kjlf ah kjlfsda ",
        firstName: "FName",
        lastName: "LName",
        email: "123@abc.com",
      },
      {
        name: "business 2",
        description:
          "kasdjvj j j j j h h gidadvhahj lf lhk  hl sfda hlkjfsda  hlkj fh kjlf ah kjlfsda ",
        firstName: "FName",
        lastName: "LName",
        email: "123@abc.com",
      },
      {
        name: "business 3",
        description:
          "kasdjvj j j j j h h gidadvhahj lf lhk  hl sfda hlkjfsda  hlkj fh kjlf ah kjlfsda ",
        firstName: "FName",
        lastName: "LName",
        email: "123@abc.com",
      },
      {
        name: "business 4",
        description:
          "kasdjvj j j j j h h gidadvhahj lf lhk  hl sfda hlkjfsda  hlkj fh kjlf ah kjlfsda ",
        firstName: "FName",
        lastName: "LName",
        email: "123@abc.com",
      },
    ]);
  });

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
