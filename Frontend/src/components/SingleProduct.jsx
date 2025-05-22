import { useNavigate, useParams } from "react-router-dom";
import { useSingleProductQuery } from "../api/productApi";
import { getToken } from "../userSlice/userSlice.jsx";
//import { useReserveMutation } from "../api/productApi";
import { useState } from "react";
import { useSelector } from "react-redux";


function SingleProduct() {
  const { id } = useParams();
  const { data: product, error, isLoading } = useSingleProductQuery(id);
 // const [reserveData, { error: reserveError, isLoading: reserveLoading }] =
 //   useReserveMutation();
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

  // Show an error message if reserve fails
  if (error) {
    return (
      <section>
        <h2>Error, please try again later.</h2>
      </section>
    );
  }

  // Handes the reservation of the product
  const handleReservation = async (product) => {
    try {
  //    await reserveData({ productId }).unwrap();
      setSuccessMessage(`Successfully Rented!`);
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
          <button onClick={() => navigate("/")}>OK</button>
        </div>
      )}
    </section>

    <section className="ProductsList">
      <div key={product.id} className="Product-Details">
        <img src={product.img_url} alt={product.title} className="product-image" />
        <h2>{product.description}</h2>
        <p>${product.price} / Day</p>

        <p>
          <strong>Available: </strong>
          {product.quantity_available}
        </p>

          {product.quantity_available > 0 && //token && 
          (
          <button onClick={() => handleReservation(product.id, product.title)}>
          Rent Product
          </button>
)}

        <button onClick={() => navigate("/")}>Back to Catalog</button>
      </div>
    </section>
  </section>
  );
}

export default SingleProduct;