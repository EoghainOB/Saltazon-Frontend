import { useContext } from "react";
import AuthContext from "../context/authProvider";
import { getProducts } from "../context/authProvider";

const Filter = () => {
  const { products, setSearchTerm, searchTerm, setFilter, filter } =
    useContext(AuthContext);

  const uniqueCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    getProducts(e.target.value, searchTerm);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    getProducts(filter, searchTerm);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="filter">
        <form className="searchForm" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="search"
            placeholder="Search"
            onChange={handleSearchChange}
          />
          <button>Search</button>
        </form>
        <form className="form-filter">
          <select onChange={handleFilterChange} value={filter}>
            <option value="all">All categories</option>
            {uniqueCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </form>
      </div>
    </>
  );
};

export default Filter;
