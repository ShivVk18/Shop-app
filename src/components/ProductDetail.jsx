import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from '../redux/slices/CartSlice';
import { toast } from 'react-hot-toast';
import { FaStar } from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center text-white">Product not found</div>;
  }

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md">
      <img src={product.image} alt={product.title} className="w-full h-72 object-cover rounded-lg mb-4" />
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-400 mb-4">{product.description}</p>
      <div className="flex items-center gap-2">
        {[...Array(5)].map((_, index) => (
          <FaStar key={index} className={index < product.rating.rate ? "text-yellow-400" : "text-gray-600"} />
        ))}
        <span>({product.rating.count} reviews)</span>
      </div>
      <p className="text-lg font-semibold text-yellow-400 my-4">${product.price.toFixed(2)}</p>
      <div className="flex justify-between">
        <span>Category: {product.category}</span>
        {cart.some((p) => p.id === product.id) ? (
          <button onClick={() => dispatch(remove(product.id))} className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600">
            Remove from Cart
          </button>
        ) : (
          <button onClick={() => dispatch(add(product))} className="bg-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-600">
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
