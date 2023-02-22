import { useContext } from "react";
import AuthContext from "../context/authProvider";

const Filter = (setFilter) => {
  const { products } = useContext(AuthContext);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="filter">
      <form className="form-filter">
        <label>Filter Tags: </label>
        <select onChange={handleChange}>
          <option value="all">Filter: All</option>
          {products.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default Filter;
