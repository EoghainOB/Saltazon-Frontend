import { useState } from "react";
import ReactPaginate from "react-paginate";
import AdminProduct from "./AdminProduct.jsx";
import AddProductForm from "./AddProductForm.jsx";

function AdminProductList({ products, storeName, storeId }) {
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage] = useState(12);

  const endOffset = itemOffset + itemsPerPage;
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <div className="addProduct">
        <AddProductForm storeId={storeId} />
      </div>
      {products.slice(itemOffset, endOffset).map((item) => {
        return (
          <div key={item.id}>
            <AdminProduct product={item} />
          </div>
        );
      })}
      {pageCount > 1 && (
        <div className="paging">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={Math.ceil(pageCount)}
            previousLabel="< Previous"
          />
        </div>
      )}
    </div>
  );
}

export default AdminProductList;
