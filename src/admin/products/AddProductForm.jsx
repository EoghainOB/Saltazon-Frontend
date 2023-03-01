import { useState, useContext } from "react";
import AuthContext from "../../context/authProvider";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

function AddProductForm({ storeId }) {
  const { setTrigger } = useContext(AuthContext);
  const navigate = useNavigate();

  const initialState = {
    title: "",
    description: "",
    category: "",
    quantity: "",
    price: "",
    image: "",
  };

  const [formState, setFormState] = useState(initialState);

  const addProduct = async (e) => {
    e.preventDefault();
    const data = {
      id: Date.now(),
      storeId: storeId,
      category: formState.category,
      title: formState.title,
      description: formState.description,
      price: formState.price,
      quantity: formState.quantity,
      imageUrl: formState.image,
    };
    await axios
      .post("http://localhost:8080/api/product/", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        resetForm();
      });
    setTrigger("yes");
    navigate("/admin");
  };

  const resetForm = () => {
    setFormState(initialState);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <>
      <form onSubmit={addProduct} className="add_product_form">
        <label htmlFor="title_input">Title</label>
        <input
          placeholder="Title of product"
          id="title_input"
          name="title"
          value={formState.title}
          onChange={handleInputChange}
        />
        <label htmlFor="description_input">Description</label>
        <input
          type="text"
          placeholder="Description of product"
          id="description_input"
          name="description"
          value={formState.description}
          onChange={handleInputChange}
        />
        <label htmlFor="category_input">Category</label>
        <input
          type="text"
          placeholder="Category"
          id="category_input"
          name="category"
          value={formState.category}
          onChange={handleInputChange}
        />
        <label htmlFor="quantity_input">Quantity</label>
        <input
          type="number"
          placeholder="1"
          id="quantity_input"
          name="quantity"
          value={formState.quantity}
          onChange={handleInputChange}
        />
        <label htmlFor="price_input">Price</label>
        <input
          type="number"
          id="price_input"
          name="price"
          value={formState.price}
          onChange={handleInputChange}
        />
        <label htmlFor="image_input">Image URL</label>
        <input
          type="text"
          placeholder="Image URL"
          id="image_input"
          name="image"
          value={formState.image}
          onChange={handleInputChange}
        />
        <br />
        <button>Add product</button>
      </form>
    </>
  );
}

export default AddProductForm;
