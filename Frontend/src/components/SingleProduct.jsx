import { useNavigate, useParams } from "react-router-dom";
import { useSingleProductQuery } from "../api/productApi";
import { getToken } from "../features/user/userSlice";
import { useSelector } from "react-redux";
import { useReserveMutation } from "../api/productApi";
import { useState } from "react";


function SingleProduct() {
  const { id } = useParams();
  const { data: product, error, isLoading } = useSingleProductQuery(id);
  const [reserveData, { error: reserveError, isLoading: reserveLoading }] =
    useReserveMutation();
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const token = useSelector(getToken);

  // Show a loading message while data is being fetched
  if (isLoading) {
    return (
      <section>
        <h2>Loading...</h2>
      </section>
    );
  }

  // Show an error message if the fetch failed
  if (reserveError) {
    return (
      <section>
        <h2>Error, please try again later.</h2>
      </section>
    );
  }

  // Show a loading message while reserve is being processed
  if (reserveLoading) {
    return (
      <section>
        <h2>Loading...</h2>
      </section>
    );
  }

  // Show an error message if reserve fails
  if (error) {
    return (
      <section>
        <h2>Error, please try again later.</h2>
      </section>
    );
  }

  // Handes the reservation of the product
  const handleReservation = async (productId, productTitle) => {
    try {
      await reserveData({ productId }).unwrap();
      setSuccessMessage(`${productTitle} was successfully checked out!`);
    } catch (error) {
      console.log("Error while checking out product", error);
    }
  };

  return (
    <section>
      <section className="Checkout_Success">
        {successMessage && (
          <div className="popup">
            <p>{successMessage}</p>
            <button onClick={() => setSuccessMessage("")}>OK</button>
          </div>
        )}
      </section>
      <section className="ProductssList">
        <div key={product.id} className="ProductDetails">
          <h2>{product.title}</h2>
          <p className="Description">Description: {product.description}</p>
          <p>ID: {product.id}</p>
          {token ? (
            <p>
              {product.available ? (
                <button onClick={() => handleReservation(product.id, product.title)}>
                  Rent Product
                </button>
              ) : (
                "Rental Unavailable"
              )}
            </p>
          ) : (
            ""
          )}
          <button onClick={() => navigate("/")}>Back to Catelog</button>
        </div>
      </section>
    </section>
  );
}

export default SingleProduct;