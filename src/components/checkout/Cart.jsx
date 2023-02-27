import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/authProvider";
import CartItem from "./CartItem";

function Cart() {
  const { setCart, auth, setCartQty } = useContext(AuthContext);
  const [total, setTotal] = useState(0);

  const cart = JSON.parse(localStorage.getItem(`cart_${auth.username}`)) || [];

  if (cart.length === 0) {
    return <div className="cartEmpty">No items in cart, why not add some?</div>;
  }

  const removeFromCart = async (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    localStorage.setItem(`cart_${auth.username}`, JSON.stringify(updatedCart));
    setCart(updatedCart);
    setTotal(0);
  };

  useEffect(() => {
    const subTotals = cart.map((item) => +item.price * +item.qty);
    const totals = subTotals.reduce((acc, item) => acc + item);
    setTotal(totals);
  }, [cart]);

  useEffect(() => {
    const cartAmount = cart?.map((item) => item.id);
    const allCartItems = cartAmount.length;
    setCartQty(allCartItems);
  }, [cart, setCartQty]);

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
          <div key={index} className="cart_item">
            <CartItem item={item} removeFromCart={removeFromCart} />
          </div>
        );
      })}
      <div className="totalAmount">
        <h2>
          <b>Total: € {total.toFixed(2)}</b>
        </h2>
        <button type="button">Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
