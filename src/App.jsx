import "./App.css";
import { useState } from "react";
import RequireAuth from "./components/requireAuth";
import { Routes, Route } from "react-router-dom";
import { fakeProducts } from "./fakedata/Fakedata.js";
import { fakecart } from "./fakedata/fakecart.js";
import Cart from "./components/checkout/Cart.jsx";
import AdminPage from "./admin/AdminPage.jsx";
import ProductList from "./components/Products/ProductList.jsx";
import LoginForm from "./components/login/LoginForm.jsx";
import NewUserForm from "./components/login/NewUserForm.jsx";
import Unauthorised from "./components/unauthorised";
import SuperAdminPage from "./admin/SuperAdminPage.jsx";
import Layout from "./components/layout";
import { useContext } from "react";
import AuthContext from "./context/authProvider";

const App = () => {
  const [currentCart, setCurrentCart] = useState(getCurrentCart());
  const { auth } = useContext(AuthContext);

  console.log(auth);

  function addToCart(productId) {
    console.log("Add " + productId + " From the App");
    //add item to the current Cart
  }

  function removeFromCart(productId) {
    console.log("Remove " + productId + " From the App");
    //remove item from the current Cart
  }

  function getCurrentCart() {
    return fakecart;
    //update to get from localstorage
  }
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route exact path="/create-new-user" element={<NewUserForm />} />
        <Route exact path="/unauthorised" element={<Unauthorised />} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route
          element={
            <RequireAuth allowedRoles={["user", "admin", "super-admin"]} />
          }
        >
          <Route
            exact
            path="/"
            element={
              <ProductList products={fakeProducts} addToCart={addToCart} />
            }
          />
          <Route
            exact
            path="/cart"
            element={
              <Cart products={currentCart} removeFromCart={removeFromCart} />
            }
          />
        </Route>
        <Route
          element={<RequireAuth allowedRoles={["admin", "super-admin"]} />}
        >
          <Route exact path="/admin" element={<AdminPage />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["super-admin"]} />}>
          <Route exact path="/admin/super" element={<SuperAdminPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
