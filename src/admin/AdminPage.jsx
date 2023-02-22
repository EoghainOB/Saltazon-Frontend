import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/authProvider";
import AdminProductList from "./products/AdminProductList";

function AdminPage() {
  const { auth, stores, products } = useContext(AuthContext);
  const [storeProducts, setStoreProducts] = useState([]);

  const adminStoreId = auth.storeId;
  const currentStore = stores.find((store) => store.id === adminStoreId);

  useEffect(() => {
    const storeItems = products.filter(
      (items) => items.storeId === adminStoreId
    );
    setStoreProducts(storeItems);
  }, []);

  return (
    <>
      <header>Welcome to the {currentStore}</header>
      <AdminProductList
        products={storeProducts}
        storeName={currentStore}
        storeId={adminStoreId}
      />
    </>
  );
}

export default AdminPage;
