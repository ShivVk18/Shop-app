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

  const handleAddToCart = () => {
    dispatch(add(product));
    toast.success('Item Added To Cart');
  };

  const handleRemoveFromCart = () => {
    dispatch(remove(product.id));
    toast.error('Item Removed From Cart');
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center py-10">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img src={product.image} alt={product.title} className="w-full h-auto object-contain" />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold text-green-600 mr-2">${product.price.toFixed(2)}</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} className={index < Math.round(product.rating.rate) ? 'text-yellow-400' : 'text-gray-300'} />
              ))}
              <span className="ml-2 text-gray-600">({product.rating.count} reviews)</span>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Category:</span> {product.category}
          </div>
          {cart.some((p) => p.id === product.id) ? (
            <button
              onClick={handleRemoveFromCart}
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
            >
              Remove from Cart
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;