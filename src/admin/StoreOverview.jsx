import { Link } from "react-router-dom";

export default function StoreOverview({ storeInfo, index }) {
  const storeId = storeInfo.uniqueStoreId;

  return (
    <>
      <h3>Store name: {storeInfo.name}</h3>
      <p>Store ID#: {storeId}</p>
      <Link to={"/admin"}>Go to {storeInfo.name} Admin</Link>
      <br />
      <button>Delete Store</button>
    </>
  );
}
