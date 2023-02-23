import axios from "../../api/axios";
import { useState } from "react";

function AdminProduct({ product }) {
  const [newQuantity, setNewQuantity] = useState(0);
  const [products, setProducts] = useState(product);

  const updateQuantity = () => {
    axios
      .patch(`http://localhost:8080/api/product/${product.id}`, {
        quantity: newQuantity,
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteItem = (id) => {
    axios
      .delete(`http://localhost:8080/api/product/${id}`)
      .then((response) => {
        console.log(response.data);
        setProducts(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {product ? (
        <div className="storesProductlist">
          <div className="storesProductlistImage">
            <img src={product.imageUrl} alt={"picture of product"} />
          </div>
          <div className="storesProductDetails">
            <h1>{product.title}</h1>
            <h2>{product.description}</h2>
            <h2>Quantity: {product.quantity}</h2>
            <input
              type="number"
              value={newQuantity}
              onChange={(e) => setNewQuantity(e.target.value)}
            />
            <button onClick={() => updateQuantity()}>Add stock</button>
            <button onClick={() => deleteItem(product.id)}>Delete Item</button>
          </div>
        </div>
      ) : (
        <p>Product has been deleted.</p>
      )}
    </>
  );
}

export default AdminProduct;
