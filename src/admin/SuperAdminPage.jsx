import StoreOverview from "./StoreOverview.jsx";
import AddStoreForm from "./AddStoreForm.jsx";
import { useContext, useState } from "react";
import AuthContext from "../context/authProvider";

function SuperAdminPage() {
  const { stores } = useContext(AuthContext);
  const [isShown, setIsShown] = useState(false);

  const handleClick = () => {
    setIsShown(!isShown);
  };
  return (
    <>
      <div className="welcome">
        <h1>Welcome Almighty SuperAdmin</h1>
      </div>
      <div className="adminAddProduct">
        <button onClick={handleClick}>Add new Store</button>
      </div>
      {isShown && (
        <div className="addStore">
          <AddStoreForm />
        </div>
      )}
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
