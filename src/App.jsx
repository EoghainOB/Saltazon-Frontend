import "./App.css";
import RequireAuth from "./components/requireAuth";
import { Routes, Route } from "react-router-dom";
import Cart from "./components/checkout/Cart.jsx";
import AdminPage from "./admin/AdminPage.jsx";
import ProductList from "./components/Products/ProductList.jsx";
import LoginForm from "./components/login/LoginForm.jsx";
import NewUserForm from "./components/login/NewUserForm.jsx";
import Unauthorised from "./components/unauthorised";
import SuperAdminPage from "./admin/SuperAdminPage.jsx";
import Layout from "./components/layout";
import ProductPage from "./components/products/ProductPage";

const App = () => {
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
          <Route exact path="/" element={<ProductList />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/product/:id" element={<ProductPage />} />
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
