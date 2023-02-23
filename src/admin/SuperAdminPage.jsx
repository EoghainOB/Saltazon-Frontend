import StoreOverview from "./StoreOverview.jsx";
import AddStoreForm from "./AddStoreForm.jsx";
import { useContext } from "react";
import AuthContext from "../context/authProvider";

function SuperAdminPage() {
  const { stores } = useContext(AuthContext);
  return (
    <>
      <header>Welcome Almighty SuperAdmin</header>
      <AddStoreForm />
      {stores.map((store, index) => {
        return (
          <div className="storesAdminlist" key={index}>
            <StoreOverview storeInfo={store} />
            <hr />
          </div>
        );
      })}
    </>
  );
}

export default SuperAdminPage;
