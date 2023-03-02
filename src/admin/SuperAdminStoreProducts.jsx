import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/authProvider";
import AdminProductList from "./products/AdminProductList";

function SuperAdminStoreProducts() {
  const { auth, stores, products, trigger, adminStore } =
    useContext(AuthContext);
  const [storeProducts, setStoreProducts] = useState([]);

  const storeId = adminStore;

  const currentStore = stores.filter(
    (store) => store.uniqueStoreId === storeId
  );

  useEffect(() => {
    let storeItems = [];
    storeItems = products.filter((items) => items.storeId === storeId);
    setStoreProducts(storeItems);
  }, [auth.role, products, storeId, trigger]);

  return (
    <>
      <div className="welcome">
        <h1>Welcome to the {currentStore[0].name}</h1>
      </div>
      <AdminProductList
        products={storeProducts}
        storeName={currentStore[0].name}
        storeId={storeId}
      />
    </>
  );
}

export default SuperAdminStoreProducts;
