import AdminProduct from "./AdminProduct.jsx";
import AddProductForm from "./AddProductForm.jsx";

function AdminProductList({ products, storeName, storeId }) {
  return (
    <div>
      <header>The items in {storeName}</header>
      <AddProductForm storeId={storeId} />
      {products.map((item) => {
        return (
          <div key={item.id}>
            <AdminProduct product={item} />;
          </div>
        );
      })}
    </div>
  );
}

export default AdminProductList;
