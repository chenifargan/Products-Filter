import React, { useEffect, useRef, useState } from "react";
import Product from "../Components/Product";

const HomePage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const selectRef = useRef(null);
  const loadProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      return data.products;
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await loadProducts();
        const uniqueCategories = Array.from(
          new Set(result.map((item) => item.category))
        );
        setCategory(["All", ...uniqueCategories]);

        if (selectedCategory === "All") {
          setAllProducts(result);
        } else {
          const filterArr = result.filter(
            (product) => product.category === selectedCategory
          );
          setAllProducts(filterArr);
        }
        if (selectRef.current) {
          selectRef.current.focus();
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setSelectedCategory(selected);
  };
  return (
    <div>
      <div>
        {
          <select
            ref={selectRef}
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {category.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        }
        <div className="container">
          {allProducts.length > 0 &&
            allProducts.map((element, index) => (
              <Product key={index} product={element} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
