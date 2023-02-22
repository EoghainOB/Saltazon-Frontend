import React from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/authProvider";

const ProductPage = () => {
  const { id } = useParams();
  const { products, setTrigger } = useContext(AuthContext);

  const filtered = products.find((product) => product.id == id);

  const addToCart = async (e) => {
    e.preventDefault();
    const data = {
      name: filtered.title,
      id: filtered.id,
      price: filtered.price,
      qty: +e.target.qty.value,
    };
    const cart = localStorage.getItem("cart");
    if (cart === null) {
      localStorage.setItem("cart", JSON.stringify([data]));
    } else {
      const getCart = localStorage.getItem("cart");
      let currentCart = JSON.parse(getCart);
      const existingItemIndex = currentCart.findIndex(
        (item) => item.id === data.id
      );
      if (existingItemIndex !== -1) {
        currentCart[existingItemIndex].qty += parseInt(data.qty);
      } else {
        currentCart.push(data);
      }
      localStorage.setItem("cart", JSON.stringify(currentCart));
      setTrigger(currentCart);
    }
  };

  return (
    <>
      <article className="productpage_item">
        <div className="productpage_list_img">
          <img src={filtered.imageUrl} alt="picture of product" />
        </div>
        <div className="productpage_info">
          <section className="productpage_list_txt">
            <h1>{filtered.title}</h1>
            <h2>{filtered.description}</h2>
            <h3>{filtered.price}</h3>
          </section>
          <div className="cartbutton">
            <form onSubmit={addToCart}>
              <select name="qty" id="qty">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button>Add to Cart</button>
            </form>
          </div>
        </div>
      </article>
    </>
  );
};

export default ProductPage;
