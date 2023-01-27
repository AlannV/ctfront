import React, { useState } from "react";
import "../../Styles/AdminProducts.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../Redux/Actions";
const { createProduct, startUploadingFiles } = allActions;

function CreateProduct() {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    name: "",
    stock: "",
    price: "",
    active: "",
    description: "",
    image: "",
  });

  const imgCloudinary = useSelector((state) => state.productImg);

  const onFileInputChange = (e) => {
    if (e.target.files === 0) return;
    dispatch(startUploadingFiles(e.target.files));
  };

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    input.image = imgCloudinary;
    dispatch(createProduct(input));
    setInput({
      name: "",
      stock: "",
      price: "",
      active: "",
      description: "",
      image: "",
    });
    e.target.reset();
  }

  return (
    <div className="ban-user-main-container">
      <div className="ban-user-sub-container">
        <h1>Create Product</h1>
        <div className="ban-user">
          <form className="admin-form" onSubmit={(e) => handleSubmit(e)}>
            <>
              <label htmlFor="name" className="admin-form-titles">
                Name:
              </label>
              <input
                key="name"
                className="admin-input"
                name="name"
                type="text"
                placeholder="Name"
                value={input.value}
                onChange={(e) => handleChange(e)}
              />
            </>
            <>
              <label htmlFor="price" className="admin-form-titles">
                Price:{" "}
              </label>
              <input
                key="price"
                name="price"
                type="text"
                className="admin-input"
                placeholder="Price"
                value={input.value}
                onChange={(e) => handleChange(e)}
              />
            </>
            <>
              <label htmlFor="stock" className="admin-form-titles">
                Stock:{" "}
              </label>
              <input
                key="stock"
                name="stock"
                type="text"
                placeholder="Stock"
                className="admin-input"
                value={input.value}
                onChange={(e) => handleChange(e)}
              />
            </>
            <>
              <label htmlFor="image" className="admin-form-titles">
                Image:{" "}
              </label>
              <input
                key="image"
                name="image"
                className="admin-input"
                placeholder="Image"
                type="file"
                value={input.image}
                onChange={onFileInputChange}
              />
            </>

            <div className="admin-buttons-container">
              <div className="another-container">
                <button type="submit" className="admin-buttons">
                  Create Product
                </button>
              </div>
            </div>
          </form>
        </div>
        <Link to="/adminmenu">
          <button className="admin-buttons">Go Back</button>
        </Link>
      </div>
    </div>
  );
}

export default CreateProduct;
