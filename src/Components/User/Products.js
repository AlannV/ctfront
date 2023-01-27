import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../../Redux/Actions/products";

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="edit-product-main-container">
      <h2>You can find this products in our store </h2>
      <div className="edit-product-sub-container">
        <div className="admin-products-container">
          {products
            ?.filter((product) => product.active === true)
            .map((product, index) => (
              <div key={index} className="admin-product">
                <img
                  className="admin-product-image"
                  key={product.image}
                  src={product.image}
                  alt="product"
                />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>$ {product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
        </div>
        <br />
        <Link to="/" className="edit-product-buttons-container">
          <button className="admin-buttons">Go Back</button>
        </Link>
      </div>
    </div>
  );
}

export default Products;
