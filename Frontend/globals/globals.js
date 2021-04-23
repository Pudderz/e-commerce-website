export const STRIPE_COUNTRY_CODES = [
  { country: "Australia", code: "AU" },
  { country: "Austria", code: "AT" },
  { country: "Belgium", code: "BE" },
  { country: "Bulgaria", code: "BG" },
  { country: "Brazil ", code: "BR" },
  { country: "Canada", code: "CA" },
  { country: "Cyprus", code: "CY" },
  { country: "Czech Republic", code: "CZ" },
  { country: "Denmark", code: "DK" },
  { country: "Estonia", code: "EE" },
  { country: "Finland", code: "FI" },
  { country: "France", code: "FR" },
  { country: "Germany", code: "DE" },
  { country: "Greece", code: "GR" },
  { country: "Hong Kong", code: "HK" },
  { country: "Hungary", code: "HU" },
  { country: "India", code: "IN" },
  { country: "Ireland", code: "IE" },
  { country: "Italy", code: "IT" },
  { country: "Japan", code: "JP" },
  { country: "Latvia", code: "LV" },
  { country: "Lithuania", code: "LT" },
  { country: "Luxembourg", code: "LU" },
  { country: "Malaysia", code: "MY" },
  { country: "Malta", code: "MT" },
  { country: "Netherlands", code: "NL" },
  { country: "New Zealand", code: "NZ" },
  { country: "Norway", code: "NO" },
  { country: "Poland", code: "PL" },
  { country: "Portugal", code: "PT" },
  { country: "Romania", code: "RO" },
  { country: "Singapore", code: "SG" },
  { country: "Slovakia", code: "SK" },
  { country: "Slovenia", code: "SI" },
  { country: "Spain", code: "ES" },
  { country: "Sweden", code: "SE" },
  { country: "Switzerland", code: "CH" },
  { country: "United Kingdom", code: "GB" },
  { country: "United States", code: "US" },
];

export const ALL_SHOE_SIZES = [
  3.5,
  4,
  4.5,
  5,
  5.5,
  6,
  6.5,
  7,
  7.5,
  8,
  8.5,
  9,
  9.5,
  10,
  10.5,
];

export const CHECKOUT_CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#222",
      color: "#222",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      backgroundColor: "#eee",

      ":-webkit-autofill": { color: "#222" },
      "::placeholder": { color: "#444" },
    },
    invalid: {
      iconColor: "#CF061F",
      color: "#CF061f",
    },
  },
};

export const CHECKOUT_EXAMPLE_INFO = {
  customer: {
    firstname: "John",
    lastname: "Doe",
    email: "mpudney2@gmail.com",
  },
  shipping: {
    name: "John Doe",
    street: "123 Fake St",
    town_city: "San Francisco",
    county_state: "CA",
    postal_zip_code: "94103",
    country: "US",
  },
};


export const CATEGORIES =[
  {
    name:"Hiking",
    description:"",
    slug:"hiking", 
  },
  {
    name:"Running",
    description:"",
    slug:"running"
  },
  {
    name:"Casual",
    description:"",
    slug:"casual",
  }
]