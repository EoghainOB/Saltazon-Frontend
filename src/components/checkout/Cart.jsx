import { useContext } from "react";
import AuthContext from "../../context/authProvider";

function Cart() {
  const { setCart, auth, products } = useContext(AuthContext);

  const cart = JSON.parse(localStorage.getItem(`cart_${auth.username}`)) || [];

  if (cart.length === 0) {
    return <h3>No items in cart, why not add some?</h3>;
  }

  const removeFromCart = async (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    localStorage.setItem(`cart_${auth.username}`, JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  return (
    <div className="cart">
      {cart.map((item, index) => {
        return (
          <article key={index} className="cart_item">
            <div className="cartImage">
              <img src={item.image} />
            </div>
            <div className="cartName">
              <h2>{item.name}</h2>
            </div>
            <div className="cartQty">
              <h2>Amount {item.qty}</h2>
            </div>
            <div className="cartPrice">
              <h2>Price {item.price}</h2>
            </div>
            <button
              id={item.id}
              type="button"
              onClick={() => removeFromCart(item.id)}
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
