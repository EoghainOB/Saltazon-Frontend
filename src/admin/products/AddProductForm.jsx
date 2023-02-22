import { useState, useContext } from "react";
import AuthContext from "../../context/authProvider";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

function AddProductForm({ storeId }) {
  const { setTrigger } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();

  const addProduct = async (e) => {
    e.preventDefault();
    const data = {
      id: Date.now(),
      storeId: storeId,
      category: category,
      title: title,
      description: description,
      price: price,
      quantity: quantity,
      imageUrl: image,
    };
    await axios
      .post("http://localhost:8080/api/product/", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
      });
    setTrigger("yes");
    navigate("/admin");
  };

  return (
    <>
      <h4>Add new Product</h4>
      <form onSubmit={addProduct} className="add_product_form">
        <label htmlFor="title_input">Title</label>
        <input
          placeholder="Title of product"
          id="title_input"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label htmlFor="description_input">Description</label>
        <input
          type="text"
          placeholder="Description of product"
          id="description_input"
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <label htmlFor="category_input">Category</label>
        <input
          type="text"
          placeholder="Category"
          id="category_input"
          onChange={(e) => setCategory(e.target.value)}
        />
        <br />
        <label htmlFor="quantity_input">Quantity</label>
        <input
          type="number"
          placeholder="1"
          id="quantity_input"
          onChange={(e) => setQuantity(e.target.value)}
        />
        <br />
        <label htmlFor="price_input">Price</label>
        <input
          type="number"
          id="price_input"
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <label htmlFor="image_input">Image URL</label>
        <input
          type="text"
          placeholder="Image URL"
          id="image_input"
          onChange={(e) => setImage(e.target.value)}
        />
        <br />
        <button>Add product</button>
      </form>
    </>
  );
}

export default AddProductForm;
