import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authProvider";
import Product from "../products/Product";
import ReactPaginate from "react-paginate";

function ProductList() {
  const { products, tags } = useContext(AuthContext);

  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage] = useState(12);

  const endOffset = itemOffset + itemsPerPage;
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <h1>Products</h1>
      <div className="products">
        {/* <Filter setFilter={setFilter} /> */}
        <>
          {products.slice(itemOffset, endOffset).map((product, index) => {
            return (
              <div key={index}>
                <Link to={`/product/${product.id}`}>
                  <Product product={product} tag={tags} />
                </Link>
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
        </>
      </div>
    </>
  );
}

export default ProductList;
