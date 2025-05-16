import { useNavigate, useParams } from "react-router-dom";
import { useSingleProductQuery } from "../api/productApi";
//import { getToken } from "../features/user/userSlice";
//import { useReserveMutation } from "../api/productApi";
import { useState } from "react";


function SingleProduct() {
  const { id } = useParams();
  const { data: product, error, isLoading } = useSingleProductQuery(id);
 // const [reserveData, { error: reserveError, isLoading: reserveLoading }] =
 //   useReserveMutation();
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  //const token = useSelector(getToken);

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
  const handleReservation = async (productId, productTitle) => {
    try {
  //    await reserveData({ productId }).unwrap();
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

    <section className="ProductsList">
      <div key={product.id} className="Product-Details">
        <img src={product.img_url} alt={product.title} className="product-image" />
        <h2>{product.description}</h2>
        <p>${product.price} / Day</p>

        <p>
          <strong>Available: </strong>
          {product.quantity_available}
        </p>

       {product.quantity_available > 0 && (
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