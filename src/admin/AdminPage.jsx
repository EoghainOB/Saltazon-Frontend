import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/authProvider";
import AdminProductList from "./products/AdminProductList";

function AdminPage() {
  const { auth, stores, products } = useContext(AuthContext);
  const [storeProducts, setStoreProducts] = useState([]);

  const adminStoreId = auth.storeId;

  const currentStore = stores.filter(
    (store) => store.uniqueStoreId === adminStoreId
  );

  useEffect(() => {
    let storeItems = [];
    if (auth.role === "super-admin") {
      storeItems = products;
    } else {
      storeItems = products.filter((items) => items.storeId === adminStoreId);
    }
    setStoreProducts(storeItems);
  }, [auth.role, products, adminStoreId]);

  return (
    <>
      <div className="welcome">
        <h1>Welcome to the {currentStore[0].name}</h1>
      </div>
      <AdminProductList
        products={storeProducts}
        storeName={currentStore[0].name}
        storeId={adminStoreId}
      />
    </>
  );
}

export default AdminPage;
