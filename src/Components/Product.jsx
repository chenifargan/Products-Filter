import React from "react";

const Product = ({ product }) => {
  return (
    <div className="product">
      <p>
        <b>{product.title}</b>
      </p>
      <p style={{ color: "gray" }}>${product.price}</p>
    </div>
  );
};

export default Product;
