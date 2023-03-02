import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext({});

export const getProducts = async (filter, searchTerm) => {
  let url = "http://localhost:8080/api/product";
  if (filter !== "all") {
    url += `?category=${filter}`;
  }
  if (searchTerm) {
    url += `?q=${searchTerm}`;
  }
  const response = await axios.get(url);
  return response.data.data;
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [trigger, setTrigger] = useState("");
  const [cart, setCart] = useState();
  const [stores, setStores] = useState("");
  const [products, setProducts] = useState();
  const [tags, setTags] = useState();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [adminStore, setAdminStore] = useState("");
  const [cartQty, setCartQty] = useState(0);

  useEffect(() => {
    getProducts(filter, searchTerm).then(setProducts);
  }, [auth, trigger, filter]);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      const decoded = jwt_decode(accessToken);
      setAuth(decoded);
    } else {
      setAuth("");
    }
  }, []);

  useEffect(() => {
    const cart =
      JSON.parse(localStorage.getItem(`cart_${auth.username}`)) || [];
    const cartAmount = cart?.map((item) => item.id);
    const allCartItems = cartAmount.length;
    setCartQty(allCartItems);
  }, [cart, products]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/store").then((response) => {
      setStores(response.data.data);
    });
  }, [trigger]);

  useEffect(() => {
    if (products) {
      const tags = products.map((product) => product.category);
      setTags(tags);
    }
  }, [products]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        tags,
        products,
        setProducts,
        cart,
        setCart,
        setTrigger,
        stores,
        setStores,
        filter,
        setFilter,
        setSearchTerm,
        searchTerm,
        cartQty,
        setCartQty,
        setAdminStore,
        adminStore,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
