import React from "react";
import "./css/Form.css";

export default function BusinessForm() {
  return (
    <div>
      <div className="form-wrapper">
        <h2 className="subheading">Business Details</h2>

        <div className="line-wrapper">
          <label>Business Name</label>
          <input type="text" className="long-text-input" />
        </div>

        <div className="line-wrapper">
          <label>Industry</label>
          <select className="short-text-input" multiple>
            <option value="food">Restaurant and Food</option>
            <option value="retail">Retail</option>
            <option value="service">Service</option>
            <option value="hospitality">Hospitality</option>
            <option value="tech">Tech</option>
            <option value="other">Other</option>
          </select>

          <label>Funding Stage</label>
          <input type="text" className="short-text-input" />
        </div>

        <div className="line-wrapper">
          <label>Business Description</label>
          <input type="text" className="chunk-text-input" />
        </div>

        <h3 className="subsub-heading">Contact Details</h3>

        <div className="line-wrapper">
          <label>First Name</label>
          <input type="text" className="short-text-input" />

          <label>Last Name</label>
          <input type="text" className="short-text-input" />
        </div>

        <div className="line-wrapper">
          <label>Email</label>
          <input type="text" className="long-text-input" />
        </div>
      </div>
    </div>
  );
}
