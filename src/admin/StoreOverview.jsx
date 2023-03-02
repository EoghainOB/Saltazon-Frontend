import { Link } from "react-router-dom";
import axios from "../api/axios";
import { useContext } from "react";
import AuthContext from "../context/authProvider";

export default function StoreOverview({ storeInfo }) {
  const { setTrigger, setAdminStore } = useContext(AuthContext);
  const storeId = storeInfo.uniqueStoreId;

  const deleteStore = () => {
    axios
      .delete(`http://localhost:8080/api/store/${storeId}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setTrigger("x");
  };

  const handleStoreId = (e) => {
    setAdminStore(storeId);
  };

  return (
    <>
      <h1>{storeInfo.name}</h1>
      <p>
        Store ID#: <b>{storeId}</b>
      </p>
      <Link to={`/admin/superproducts/`} onClick={handleStoreId}>
        <h4>Admin Page</h4>
      </Link>
      <button onClick={deleteStore}>Delete Store</button>
    </>
  );
}
