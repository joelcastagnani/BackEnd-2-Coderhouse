import { useEffect } from "react";
import { useState } from "react";
import { ProductsList } from "../productsList/ProductsList";

export const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const result = await fetch("http://localhost:8080/api/products").then(
        (res) => res.json()
      );
      setProducts(result.data);
    };
    getProducts();
  }, []);

  return (
    <div className="container">
       <ProductsList products={products} />
    </div>
  );
};


