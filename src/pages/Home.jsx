import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import { setCategories } from "../redux/slices/CategorySlice";

const Home = () => {
  const API_URL = "https://fakestoreapi.com/products";
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.category);

  useEffect(() => {
    fetchProductsData();
    fetchCategories();
  }, []);

  async function fetchProductsData() {
    setLoading(true);
    try {
      const output = await fetch(API_URL);
      const data = await output.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
      setProducts([]);
    }
    setLoading(false);
  }

  async function fetchCategories() {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();
      dispatch(setCategories(data));
    } catch (err) {
      console.log(err);
    }
  }

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {selectedCategory ? `${selectedCategory} Products` : 'All Products'}
      </h1>
      {loading ? (
        <Spinner />
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-xl font-semibold">No Products Found</div>
      )}
    </div>
  );
};

export default Home;