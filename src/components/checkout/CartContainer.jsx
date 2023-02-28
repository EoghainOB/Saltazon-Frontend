import { useContext } from "react";
import AuthContext from "../../context/authProvider";
import Cart from "./Cart";
import CartEmpty from "./CartEmpty";

export default function CartContainer() {
  const { auth } = useContext(AuthContext);
  const cart = JSON.parse(localStorage.getItem(`cart_${auth.username}`)) || [];

  if (cart.length === 0) {
    return <CartEmpty />;
  }
  return <Cart />;
}
