import { useContext } from "react";
import AuthContext from "../../context/authProvider";
import CartItem from "./CartItem";

function Cart() {
  const { setCart, auth, products } = useContext(AuthContext);

  const cart = JSON.parse(localStorage.getItem(`cart_${auth.username}`)) || [];

  if (cart.length === 0) {
    return <div className="cartEmpty">No items in cart, why not add some?</div>;
  }

  const removeFromCart = async (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    localStorage.setItem(`cart_${auth.username}`, JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  return (
    <div className="cart">
      <div className="cartIndex">
        <div className="cartImage"></div>
        <div className="cartName">
          <h2>Product</h2>
        </div>
        <div className="cartQty">
          <h2>Qty</h2>
        </div>
        <div className="cartPrice">
          <h2>Price</h2>
        </div>
        <div className="cartSubtotal">
          <h2>Sub Total</h2>
        </div>
        <div className="delButton">
          <h2>Remove</h2>
        </div>
      </div>
      {cart.map((item, index) => {
        return (
          <CartItem item={item} index={index} removeFromCart={removeFromCart} />
        );
      })}
    </div>
  );
}

export default Cart;
