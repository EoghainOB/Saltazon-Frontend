import axios from "../../api/axios";
import { useState, useContext } from "react";
import AuthContext from "../../context/authProvider";

function AdminProduct({ product }) {
  const { setTrigger } = useContext(AuthContext);
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
    setTrigger(products);
  };

  const deleteItem = (id) => {
    axios
      .delete(`http://localhost:8080/api/product/${id}`)
      .then((response) => {
        setProducts(null);
      })
      .catch((error) => {
        console.error(error);
      });
    setTrigger(products);
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
            <h2>
              <b>Quantity:</b> {product.quantity}
            </h2>
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
