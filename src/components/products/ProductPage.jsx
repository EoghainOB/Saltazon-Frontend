import React from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/authProvider";

const ProductPage = () => {
  const { id } = useParams();
  const { auth, products, setTrigger, stores } = useContext(AuthContext);

  const filtered = products.find((product) => product.id == id);
  const currentStore = stores.filter(
    (store) => store.uniqueStoreId === filtered.storeId
  );

  const addToCart = async (e) => {
    e.preventDefault();
    const data = {
      owner: auth.username,
      name: filtered.title,
      id: filtered.id,
      price: filtered.price,
      image: filtered.imageUrl,
      qty: +e.target.qty.value,
    };
    const cart =
      JSON.parse(localStorage.getItem(`cart_${auth.username}`)) || [];

    const existingItemIndex = cart.findIndex((item) => item.id === data.id);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].qty += parseInt(data.qty);
    } else {
      cart.push(data);
    }
    localStorage.setItem(`cart_${auth.username}`, JSON.stringify(cart));
    setTrigger(cart);
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
            <h3>€ {filtered.price}</h3>
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
              <br />
              <button>Add to Cart</button>
            </form>
            <h5>
              This item is sold by {currentStore[0].name}
              <br />
              In stock: {filtered.quantity}
            </h5>
          </div>
        </div>
      </article>
    </>
  );
};

export default ProductPage;
