import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const [trigger, setTrigger] = useState("");
  const [cart, setCart] = useState("");
  const [stores, setStores] = useState("");
  const [products, setProducts] = useState();
  const [tags, setTags] = useState();

  const getProducts = async () => {
    const data = await axios.get("http://localhost:8080/api/product");
    setProducts(data.data.data);
  };

  useEffect(() => {
    getProducts();
  }, [auth, trigger]);

  const getStores = async () => {
    const data = await axios.get("http://localhost:8080/api/store");
    setStores(data.data.data);
  };

  useEffect(() => {
    getStores();
  }, []);

  const getTags = async () => {
    let tags = await products?.map((product) => product.category);
    setTags(tags);
  };

  useEffect(() => {
    getTags();
  }, [auth, products]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || ""));
  }, [trigger]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        tags,
        products,
        cart,
        setCart,
        setTrigger,
        stores,
        setStores,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;