import { useEffect } from "react";
import { useState } from "react";

export const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const result = await fetch("http://localhost:8080/api/products").then(res => res.json())
      console.log(result);
    }
    getProducts()
  }, []);

  return <div>ProductPage</div>;
};
