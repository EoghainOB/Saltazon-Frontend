import StoreOverview from "./StoreOverview.jsx";
import AddStoreForm from "./AddStoreForm.jsx";
import { useContext } from "react";
import AuthContext from "../context/authProvider";

function SuperAdminPage() {
  const { stores } = useContext(AuthContext);
  return (
    <>
      <div className="welcome">
        <h2>Welcome Almighty SuperAdmin</h2>
      </div>
      <div className="addStore">
        <AddStoreForm />
      </div>
      {stores.map((store, index) => {
        return (
          <div className="storesAdminlist" key={index}>
            <StoreOverview storeInfo={store} />
          </div>
        );
      })}
    </>
  );
}

export default SuperAdminPage;
