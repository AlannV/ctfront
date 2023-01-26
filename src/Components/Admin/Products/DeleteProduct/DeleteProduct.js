import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { v4 as randomId } from "uuid";

import {
  deleteProduct,
  activateProduct,
  getProducts,
} from "../../../../Redux/Actions/products";

import "./DeleteProduct.css";

import Paging from "../../Paging/Paging";
import Loading from "../../../Common/Loading/Loading";

function DeleteProduct() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  function paging(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function handleDeactivate(e) {
    dispatch(deleteProduct(e));
    setTimeout(() => {
      dispatch(getProducts());
    }, 1000);
  }

  function handleActivate(e) {
    dispatch(activateProduct(e));
    setTimeout(() => {
      dispatch(getProducts());
    }, 1000);
  }

  return (
    <div className="edit-product-main-container">
      <h1>Activate or deactivate Products</h1>
      <Paging
        itemsPerPage={productsPerPage}
        allItems={products?.length}
        paging={paging}
      />
      <div className="edit-product-sub-container">
        <div className="edit-product">
          {currentProducts ? (
            <div key={randomId()} className="admin-products-container">
              {currentProducts?.map((product) => (
                <div key={randomId()} className="admin-product">
                  <img
                    className="admin-product-image"
                    key={randomId()}
                    src={product.image}
                    alt="product"
                  />
                  <div key={randomId()} className="product-info">
                    <h3>Product : {product.name}</h3>
                    <p>Price : ${product.price}</p>
                    <p>Stock : {product.stock}</p>
                    <p>Active : {product.active ? "Yes" : "No"}</p>
                  </div>
                  <div key={randomId()} className="admin-buttons-container">
                    <div key={randomId()} className="another-container">
                      {product.active === true ? (
                        <button
                          className="delete-product-button"
                          onClick={() => handleDeactivate(product.product_id)}
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button
                          className="delete-product-button"
                          onClick={() => handleActivate(product.product_id)}
                        >
                          Activate
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Loading />
          )}
        </div>
        <Link to="/adminmenu">
          <button className="admin-buttons">Go Back</button>
        </Link>
      </div>
    </div>
  );
}

export default DeleteProduct;
