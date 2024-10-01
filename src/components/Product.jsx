import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { add, remove } from "../redux/slices/CartSlice";

const Product = ({ product }) => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(add(product));
    toast.success("Item Added To Cart");
  };

  const removeFromCart = () => {
    dispatch(remove(product.id));
    toast.error("Item Removed From Cart");
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} className="w-full h-48 object-contain" />
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2 truncate">{product.title}</h2>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-green-600">${product.price.toFixed(2)}</span>
          </div>
        </div>
      </Link>
      <div className="p-4 pt-0">
        {cart.some((p) => p.id === product.id) ? (
          <button
            className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            onClick={removeFromCart}
          >
            Remove
          </button>
        ) : (
          <button
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            onClick={addToCart}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;