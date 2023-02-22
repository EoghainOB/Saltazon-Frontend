import { useContext } from "react";
import AuthContext from "../../context/authProvider";

function Cart() {
  const { cart, setCart } = useContext(AuthContext);
  if (cart.length === 0) {
    return <h3>No items in cart, why not add some?</h3>;
  }

  const removeFromCart = async (id) => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedItems = items.filter((item) => item._id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    setCart(updatedItems);
  };

  return (
    <div>
      {cart.map((item, index) => {
        return (
          <article key={index} className="cart_item">
            <section className="text_section">
              <h2>{item.name}</h2>
              <h3>Amount {item.qty}</h3>
              <h3>Price {item.price}</h3>
            </section>
            <button
              id={item._id}
              type="button"
              onClick={() => removeFromCart(item._id)}
            >
              Remove from Cart
            </button>
          </article>
        );
      })}
    </div>
  );
}

export default Cart;
