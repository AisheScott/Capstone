import  { useState } from "react";
import { useProductsQuery } from "../api/productApi";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";


function Products () {

    const { data = {}, error, isLoading } = useProductsQuery();
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

      const productsToDisplay =
      searchParameter !== "" && data
        ? data.filter(
            (product) =>
              (product.name &&
                product.name
                  .toUpperCase()
                  .includes(searchParameter.toUpperCase())) ||
              (product.author &&
                product.author
                  .toUpperCase()
                  .includes(searchParameter.toUpperCase())) ||
              (product.description &&
                product.description
                  .toUpperCase()
                  .includes(searchParameter.toUpperCase()))
          )
        : data;
  
    return (
        <section className="ProductDetails">
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
            {productsToDisplay.map((product) => (
                <div key={product.id} className="product-card">

                <div >
                  <img src={product.coverimage} alt={product.title} className="product-image" />
                    <h2>
                    {
                        product.title
                    }
                    </h2>

                    <p>
                    {
                        product.name
                    }
                    </p>

                    <p>
                      Available: 
                       {product.available ? "Yes" : "No"}
                    
                    </p>
                    <button onClick={() => navigate(`/${product.id}`)}>Details</button>
                </div>
                </div>
            ))}
        </section>
  );
}

export default Products;