import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/authProvider";
import CartItem from "./CartItem";

function Cart() {
  const { setCart, auth } = useContext(AuthContext);
  const [total, setTotal] = useState(0);

  const cart = JSON.parse(localStorage.getItem(`cart_${auth.username}`)) || [];

  const removeFromCart = async (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    localStorage.setItem(`cart_${auth.username}`, JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const updateQty = (e, id) => {
    const newQty = e.target.value;
    const itemIndex = cart.findIndex((item) => item.id === id);
    const updatedCart = [...cart];
    updatedCart[itemIndex].qty = newQty;
    localStorage.setItem(`cart_${auth.username}`, JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  useEffect(() => {
    const subTotals = cart.map((item) => +item.price * +item.qty);
    const totals = subTotals.reduce((acc, item) => acc + item);
    setTotal(totals);
  }, [cart]);

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
            <CartItem
              item={item}
              removeFromCart={removeFromCart}
              updateQty={updateQty}
            />
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
