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
      {stores.map((store) => {
        return <StoreOverview storeInfo={store} />;
      })}
    </>
  );
}

export default SuperAdminPage;
