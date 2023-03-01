import { Link } from "react-router-dom";

export default function StoreOverview({ storeInfo, index }) {
  const storeId = storeInfo.uniqueStoreId;

  const deleteStore = (e) => {};

  return (
    <>
      <h1>{storeInfo.name}</h1>
      <p>
        Store ID#: <b>{storeId}</b>
      </p>
      <Link to={"/admin"}>
        <h4>Go to store Admin</h4>
      </Link>
      <button onClick={deleteStore}>Delete Store</button>
    </>
  );
}
