import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Form.css";

export default function BusinessForm() {
  const Navigate = useNavigate();

  const [formData, setFormData] = useState({
    description: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const submitForm = () => {
    Navigate("/business");
  };

  return (
    <div>
      <div>
        <a href="/" className="header">
          Oyster
        </a>
      </div>
      <div className="form-wrapper">
        <h2 className="subheading">Business Details</h2>

        <div className="line-wrapper">
          <label>Business Name</label>
          <input
            type="text"
            className="long-text-input"
            name="name"
            onChange={handleChange}
          />
        </div>

        <div className="line-wrapper">
          <label>Industry hold [ctrl] to select multiple</label>
          <div className="select-wrapper">
            <select
              className="short-text-input"
              multiple
              name="industry"
              onChange={handleChange}
            >
              <option value="food">Restaurant and Food</option>
              <option value="retail">Retail</option>
              <option value="service">Service</option>
              <option value="hospitality">Hospitality</option>
              <option value="tech">Tech</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="double-stack">
            <div className="stack-elem">
              <label>Funding Stage</label>
              <select
                className="short-text-input single-select"
                name="fundingStage"
                onChange={handleChange}
              >
                <option value="seed">Idea/Seed</option>
                <option value="scale">Scaling</option>
                <option value="expand">Expansion</option>
              </select>
            </div>

            <div className="stack-elem">
              <label>Sub-Industry</label>
              <input
                type="text"
                name="subIndustry"
                className="short-text-input"
                placeholder="ex: yoga studio, fast food, etc."
              />
            </div>
          </div>
        </div>

        <div className="line-wrapper">
          <label>Business Description</label>
          <textarea
            type="text"
            className="chunk-text-input"
            value={formData.description}
            placeholder="Descibe your business here... What do you do? What more can you tell us about your niche/speciality? What is your vision?"
            name="description"
            onChange={handleChange}
          />
        </div>

        <h3 className="subsub-heading">Contact Details</h3>

        <div className="line-wrapper">
          <label>First Name</label>
          <input
            type="text"
            className="short-text-input"
            name="firstName"
            onChange={handleChange}
          />

          <label>Last Name</label>
          <input
            type="text"
            className="short-text-input"
            name="lastName"
            onChange={handleChange}
          />
        </div>

        <div className="line-wrapper">
          <label>Email</label>
          <input
            type="text"
            className="long-text-input"
            name="email"
            onChange={handleChange}
          />
        </div>
        <button className="submit" onClick={submitForm}>
          Submit
        </button>
      </div>
    </div>
  );
}
