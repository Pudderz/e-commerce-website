import React, { Component } from "react";

export default class ShippingForm extends Component {
  constructor(props) {
    super(props);

  }


  handleChange(e) {
    this.props.changeValue(e.target.name, e.target.value);
  }

  render() {
    return (
      <div className="shippingForm">
        <div className="row">
          <div className="inputContainer">
            <label>
              <p>First name*</p>
              <input
                name="firstName"
                required
                onChange={this.handleChange.bind(this)}
                value={this.props.shippingInfo.firstName}
              />
            </label>
          </div>

          <div className="inputContainer">
            <label>
              <p>Last name*</p>
              <input
                name="lastName"
                required
                onChange={this.handleChange.bind(this)}
                value={this.props.shippingInfo.lastName}
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
                placeholder="Enter a country"
                required
                onChange={this.handleChange.bind(this)}
                value={this.props.shippingInfo.deliveryCountry}
              />
            </label>
          </div>
          <div className="inputContainer">
            <label>
              <p>City*</p>
              <input
                name="town_city"
                required
                onChange={this.handleChange.bind(this)}
                value={this.props.shippingInfo.town_city}
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
                onChange={this.handleChange.bind(this)}
                value={this.props.shippingInfo.street}
              />
            </label>
          </div>
          <div className="inputContainer">
            <label>
              <p>Address line 2</p>
              <input
                name="street2"
                placeholder="Appartment, buero, etc."
               
                onChange={this.handleChange.bind(this)}
                value={this.props.shippingInfo.street2}
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
                onChange={this.handleChange.bind(this)}
                value={this.props.shippingInfo.deliveryRegion}
              />
            </label>
          </div>
          <div className="inputContainer">
            <label>
              <p>Postal code*</p>
              <input
                name="postal_zip_code"
                required
                onChange={this.handleChange.bind(this)}
                value={this.props.shippingInfo.postal_zip_code}
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="inputContainer">
            <label>
              <p>Telephone</p>
              <input
                onChange={this.handleChange.bind(this)}
                name="phoneNumber"
                value={this.props.shippingInfo.phoneNumber}
              />
            </label>
          </div>
          <div className="inputContainer">
            <label>
              <p>Email address*</p>
              <input
                type="email"
                name="email"
                required
                onChange={this.handleChange.bind(this)}
                value={this.props.shippingInfo.email}
              />
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
            onChange={this.handleChange.bind(this)}
            value={this.props.shippingInfo.orderNotes}
          />
        </label>
      </div>
    );
  }
}

ShippingForm.propTypes = {};
