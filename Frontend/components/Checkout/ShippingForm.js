import { Select } from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import { commerce } from "../../lib/commerce";

export const ShippingForm = (props) => {
  const [countries, setCountries] = useState({});
  const [subDivision, setSubdivisions] = useState({});


  useEffect(() => {
    commerce.services.localeListCountries().then((response) => {
      console.log(response);
      setSubdivisions();
      setCountries(response);
    });
  }, []);


  useEffect(() => {
    console.log(props.shippingInfo.deliveryCountry);

    if (props.shippingInfo.deliveryCountry !== "") {
      commerce.services
        .localeListSubdivisions(props.shippingInfo.deliveryCountry)
        .then((response) => {
          setSubdivisions(response);
          console.log(response);
        });
    }
  }, [props.shippingInfo.deliveryCountry]);

  const handleCountryChange = (e) => {
    props.changeValue("deliveryCountry", e.target.value);
  };

  const handleRegionChange = (e) => {
    props.changeValue("deliveryRegion", e.target.value);
  };

  const handleChange = (e) => {
    props.changeValue(e.target.name, e.target.value);
  };

  return (
    <div className="shippingForm">
      <div className="row">
        <div className="inputContainer">
          <label>
            <p>First name*</p>
            <input
              name="firstName"
              required
              onChange={handleChange}
              value={props.shippingInfo.firstName}
            />
          </label>
        </div>

        <div className="inputContainer">
          <label>
            <p>Last name*</p>
            <input
              name="lastName"
              required
              onChange={handleChange}
              value={props.shippingInfo.lastName}
            />
          </label>
        </div>
      </div>
      <div className="row">
        <div className="inputContainer">
          <label>
            <p>Country*</p>

            <select
              name="deliveryCountry"
              value={props.shippingInfo.deliveryCountry}
              onChange={handleCountryChange}
              style={{ width: "100%", fontSize: "18px", height: "25px" }}
              required
            >
              <option value="" key="0">
                Please select Country
              </option>
              {Object.keys(countries?.countries || {}).map((value) => (
                <option value={value} key={value}>
                  {countries.countries[value]}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="inputContainer">
          <label>
            <p>City*</p>
            <input
              name="town_city"
              required
              onChange={handleChange}
              value={props.shippingInfo.town_city}
            />
          </label>
        </div>
      </div>
      <div className="row">
        <div className="inputContainer">
          <label>
            <p>Address line 1*</p>
            <input
              name="street"
              placeholder="House number, steet, etc."
              required
              onChange={handleChange}
              value={props.shippingInfo.street}
            />
          </label>
        </div>
        <div className="inputContainer">
          <label>
            <p>Address line 2</p>
            <input
              name="street2"
              placeholder="Appartment, buero, etc."
              onChange={handleChange}
              value={props.shippingInfo.street2}
            />
          </label>
        </div>
      </div>
      <div className="row">
        <div className="inputContainer">
          <label>
            <p>State/province/region*</p>

            <select
              name="deliveryRegion"
              disabled={props.shippingInfo.deliveryCountry === ""}
              value={props.shippingInfo.deliveryRegion}
              onChange={handleRegionChange}
              placeholder="State/province/region"
              style={{ width: "100%", fontSize: "14px", height: "25px" }}
              required
            >
              <option value="" key="0">
                Please select region
              </option>
              {Object.keys(subDivision?.subdivisions || {}).map((value) => (
                <option value={value} key={value}>
                  {subDivision.subdivisions[value]}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="inputContainer">
          <label>
            <p>Postal code*</p>
            <input
              name="postal_zip_code"
              required
              onChange={handleChange}
              value={props.shippingInfo.postal_zip_code}
            />
          </label>
        </div>
      </div>
      <div className="row">
        <div className="inputContainer">
          <label>
            <p>Email address*</p>
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              value={props.shippingInfo.email}
              placeholder="email address for confirmation email"
            />
          </label>
        </div>
      </div>

      <label>
        <p>Order notes (optional)</p>
        <textarea
          name="orderNotes"
          style={{
            resize: "vertical",
            width: "100%",
            minHeight: "100px",
            fontSize: "16px",
            fontFamily: "inherit",
            padding: "5px 5px",
          }}
          onChange={handleChange}
          value={props.shippingInfo.orderNotes}
          placeholder="Order notes"
        />
      </label>
    </div>
  );
};

ShippingForm.propTypes = {};

export default ShippingForm;
