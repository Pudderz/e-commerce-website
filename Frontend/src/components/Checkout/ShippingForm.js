import React, { Component } from "react";

  constructor(props) {
    super(props);

    this.state = {
      receiveNewsletter: true,
      saveInfo: true,
    };

    this.toggleNewsletter = this.toggleNewsletter.bind(this);
  }

  toggleNewsletter() {
    this.setState({
      receiveNewsletter: !this.state.receiveNewsletter,
    });
  }

  render() {
    const { receiveNewsletter } = this.state;

    return (
      <div className="shippingForm">
        <div className="row">
          <div className="inputContainer">
            <label>
              <p>First name*</p>
              <input name="firstName" required />
            </label>
          </div>
          <div className="inputContainer">
            <label>
              <p>Middle name (optional)</p>
              <input />
            </label>
          </div>
          <div className="inputContainer">
            <label>
              <p>Last name*</p>
              <input name="lastName" required />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="inputContainer">
            <label>
              <p>Country*</p>

              <input
                name="deliveryCountry"
                placeholder="Select a country"
                required
              />
            </label>
          </div>
          <div className="inputContainer">
            <label>
              <p>City*</p>
              <input name="shipping[town_city]" required />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="inputContainer">
            <label>
              <p>Address line 1*</p>
              <input
                name="shipping[street]"
                placeholder="House number, steet, etc."
                required
              />
            </label>
          </div>
          <div className="inputContainer">
            <label>
              <p>Address line 2*</p>
              <input
                name="street2"
                placeholder="Appartment, buero, etc."
                required
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="inputContainer">
            <label>
              <p>State/province/region*</p>

              <input
                placeholder="Select a region"
                name="deliveryRegion"
                required
              />
            </label>
          </div>
          <div className="inputContainer">
            <label>
              <p>Postal code*</p>
              <input name="shipping[postal_zip_code]" required />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="inputContainer">
            <label>
              <p>Telephone</p>
              <input />
            </label>
          </div>
          <div className="inputContainer">
            <label>
              <p>Email address*</p>
              <input type="email" name="customer[email]" required />
            </label>
          </div>
        </div>
        <div className="row">
          <div>
            <label>
              <p>Shipping method*</p>
            </label>
          </div>
        </div>

        <label>
          <p>Order notes (optional)</p>
          <textarea
            name="orderNotes"
            style={{ resize: "vertical", width: "100%", minHeight: "100px" }}
          />
        </label>
      </div>
    );
  }
}

ShippingForm.propTypes = {};
