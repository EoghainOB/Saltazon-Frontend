import { useState } from "react";
import ReactPaginate from "react-paginate";
import AdminProduct from "./AdminProduct.jsx";
import AddProductForm from "./AddProductForm.jsx";

function AdminProductList({ products, storeName, storeId }) {
  const [isShown, setIsShown] = useState(false);

  const handleClick = () => {
    setIsShown(!isShown);
  };

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
      <div className="adminAddProduct">
        <button onClick={handleClick}>Add new Product</button>
      </div>
      {isShown && (
        <div className="addProduct">
          <AddProductForm storeId={storeId} />
        </div>
      )}
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
            nextLabel={
              Math.ceil(endOffset / itemsPerPage) === pageCount ? "" : "Next >"
            }
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={Math.ceil(pageCount)}
            previousLabel={itemOffset === 0 ? "" : "< Previous"}
          />
        </div>
      )}
    </div>
  );
}

export default AdminProductList;
