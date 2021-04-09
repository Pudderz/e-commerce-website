import React from "react";


export const ShippingForm = (props) => {

  const handleChange = (e) => {
    props.changeValue(e.target.name, e.target.value);
  };

  return (
    <div className="shippingForm" >
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
            <input
              name="deliveryCountry"
              
              required
              onChange={handleChange}
              value={props.shippingInfo.deliveryCountry}
            />
           
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
            <input
              name="deliveryRegion"
              placeholder="Appartment, buero, etc."
              onChange={handleChange}
              value={props.shippingInfo.deliveryRegion}
            />
            
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
