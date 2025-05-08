import  { useState } from "react";
import { useRentalsQuery } from "../api/rentalApi";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";


function Rentals () {

    const { data = {}, error, isLoading } = useRentalsQuery();
    const navigate = useNavigate();
    const [searchParameter, setSearchParameter] = useState("");

    if (isLoading) {
        return (
          <section>
            <h2>Loading...</h2>
          </section>
        );
      }

      if (error) {
        return (
          <section>
            <h2>Error, please try again later.</h2>
          </section>
        );
      }

      const rentalsToDisplay =
      searchParameter !== "" && data
        ? data.filter(
            (rental) =>
              (rental.name &&
                rental.name
                  .toUpperCase()
                  .includes(searchParameter.toUpperCase())) ||
              (rental.author &&
                rental.author
                  .toUpperCase()
                  .includes(searchParameter.toUpperCase())) ||
              (rental.description &&
                rental.description
                  .toUpperCase()
                  .includes(searchParameter.toUpperCase()))
          )
        : data;
  
    return (
        <section className="RentalDetails">
            <div id="Login_Register">

              <button onClick={() => navigate("/Login")}>Log In</button>
              <button onClick={() => navigate("/Register")}>Register</button>

            </div>
            <div id="SearchBar">
              <SearchBar
                searchParameter={searchParameter}
                setSearchParameter={setSearchParameter}
              />
            </div>          
            {rentalsToDisplay.map((rental) => (
                <div key={rental.id} className="rental-card">

                <div >
                  <img src={rental.coverimage} alt={rental.title} className="rental-image" />
                    <h2>
                    {
                        rental.title
                    }
                    </h2>

                    <p>
                    {
                        rental.name
                    }
                    </p>

                    <p>
                      Available: 
                       {rental.available ? "Yes" : "No"}
                    
                    </p>
                    <button onClick={() => navigate(`/${rental.id}`)}>Details</button>
                </div>
                </div>
            ))}
        </section>
  );
}

export default Rentals;