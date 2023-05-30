import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiURL } from "../util/api";
import { Link } from "react-router-dom";

const CountryInfo = () => {
  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { countryName } = useParams();


  useEffect(() => {
    const getCountryByName = async () => {
      try {
        const res = await fetch(`${apiURL}/name/${countryName}`);

        if (!res.ok) throw new Error("country doesn't exit yet!");

        const data = await res.json();

        setCountry(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };

    getCountryByName();
  }, [countryName]);

  return (
    <div className="country___info">
     
      {isLoading && !error && <h4>zzzzzzz...</h4>}
      {error && !isLoading && { error }}

      {country?.map((country, index) => (
        <div className="country_container" key={index}>
          <div className="countryinfoimage">
            <img src={country.flags.png} alt="" />
          </div>

          <div className="countryinfo">
            <h3>{country.name.common}</h3>

            <div className="countryinfoleft">
              <h5>
                Population:{" "}
                <span>
                  {new Intl.NumberFormat().format(country.population)}
                </span>
              </h5>
              <h5>
                Region: <span>{country.region}</span>
              </h5>
              <h5>
                Sub Region: <span>{country.subregion}</span>
              </h5>
              <h5>
                Capital: <span>{country.capital}</span>
              </h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountryInfo;
