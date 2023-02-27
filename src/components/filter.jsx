import { useContext, useState } from "react";
import AuthContext from "../context/authProvider";
import { getProducts } from "../context/authProvider";

const Filter = () => {
  const { products, setSearchTerm, searchTerm, setFilter, filter, setTrigger } =
    useContext(AuthContext);

  const [search, setSearch] = useState("");

  const uniqueCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    getProducts(e.target.value, searchTerm);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(search);
    getProducts(filter, searchTerm);
    setTrigger();
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="filter">
        <form className="searchForm" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="search"
            placeholder="Search"
            onChange={handleSearch}
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
