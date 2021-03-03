import React, { useState, useEffect } from "react";
import { commerce } from "../../lib/commerce";

export const AvailableCountries = (props) => {
  const [countries, setCountries] = useState({});
  const [subDivision, setSubdivisions] = useState({});

  const [selectedCountry, setSelectedCountry] = useState("");
  useEffect(() => {
    commerce.services.localeListCountries().then((response) => {
      setCountries(response);
    });
  }, []);

  useEffect(() => {
    console.log(selectedCountry);

    if (selectedCountry !== "") {
      commerce.services
        .localeListSubdivisions(selectedCountry)
        .then((response) => setSubdivisions(response));
    }
  }, [selectedCountry]);

  const handleCountryChange = (e) => {
    props.changeValue("deliveryCountry", e.target.value);
    setSelectedCountry(e.target.value);
  };

  const handleChange = (e) => {
    props.changeValue("deliveryRegion", e.target.value);
  };

//   Purify dangerouslySetInnerHTML
  return (
    <div>
      <select
        value={selectedCountry}
        onChange={handleCountryChange}
        dangerouslySetInnerHTML={{ __html: countries?.html }}
      ></select>
      <select
        onChange={handleChange}
        dangerouslySetInnerHTML={{ __html: subDivision?.html }}
      ></select>
    </div>
  );
};
