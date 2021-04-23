import React from "react";
import { STRIPE_COUNTRY_CODES } from "../../globals/globals";
import styled from "styled-components";

const ShippingFormWrapper = styled.div`
  margin: auto;
  text-align: start;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: space-between;
  margin: 30px 0;
`;

const InputContainer = styled.div`
  width: 45%;
  flex-grow: 1;
  min-width: 250px;

  p {
    margin: 0 0 5px;
  }
  input,
  select {
    height: 25px;
    width: 100%;
    font-size: 18px;
  }
`;

export const ShippingForm = (props) => {
  const handleChange = (e) => {
    props.changeValue(e.target.name, e.target.value);
  };

  return (
    <ShippingFormWrapper>
      <Row>
        <InputContainer>
          <label>
            <p>First name*</p>
            <input
              name="firstName"
              required
              onChange={handleChange}
              value={props.shippingInfo.firstName}
            />
          </label>
        </InputContainer>

        <InputContainer>
          <label>
            <p>Last name*</p>
            <input
              name="lastName"
              required
              onChange={handleChange}
              value={props.shippingInfo.lastName}
            />
          </label>
        </InputContainer>
      </Row>
      <Row>
        <InputContainer>
          <label>
            <p>Country*</p>
            <select
              name="deliveryCountry"
              required
              onChange={handleChange}
              value={props.shippingInfo.deliveryCountry}
              placeholder="Select a country"
            >
              {STRIPE_COUNTRY_CODES.map((country) => (
                <option value={country.code} key={country.code}>
                  {country.country}
                </option>
              ))}
            </select>
          </label>
        </InputContainer>
        <InputContainer>
          <label>
            <p>City*</p>
            <input
              name="town_city"
              required
              onChange={handleChange}
              value={props.shippingInfo.town_city}
            />
          </label>
        </InputContainer>
      </Row>
      <Row>
        <InputContainer>
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
        </InputContainer>
        <InputContainer>
          <label>
            <p>Address line 2</p>
            <input
              name="street2"
              placeholder="Appartment, buero, etc."
              onChange={handleChange}
              value={props.shippingInfo.street2}
            />
          </label>
        </InputContainer>
      </Row>
      <Row>
        <InputContainer>
          <label>
            <p>State/province/region*</p>
            <input
              name="deliveryRegion"
              placeholder="Appartment, buero, etc."
              onChange={handleChange}
              value={props.shippingInfo.deliveryRegion}
            />
          </label>
        </InputContainer>
        <InputContainer>
          <label>
            <p>Postal code*</p>
            <input
              name="postal_zip_code"
              required
              onChange={handleChange}
              value={props.shippingInfo.postal_zip_code}
            />
          </label>
        </InputContainer>
      </Row>
      <Row>
        <InputContainer>
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
        </InputContainer>
      </Row>

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
    </ShippingFormWrapper>
  );
};

ShippingForm.propTypes = {};

export default ShippingForm;
