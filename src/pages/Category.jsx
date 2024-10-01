import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCategories, setSelectedCategory } from '../redux/slices/CategorySlice';

function Category() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();
      dispatch(setCategories(data));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Product Categories</h1>
      <ul className="space-y-4">
       
        <li className="bg-white shadow-md rounded-lg overflow-hidden">
          <Link
            to="/"
            className="block p-4 hover:bg-gray-50 transition duration-150 ease-in-out"
            onClick={() => dispatch(setSelectedCategory(null))}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-gray-900">All Categories</span>
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </Link>
        </li>
        {/* Individual categories */}
        {categories.map((category) => (
          <li key={category} className="bg-white shadow-md rounded-lg overflow-hidden">
            <Link
              to="/"
              className="block p-4 hover:bg-gray-50 transition duration-150 ease-in-out"
              onClick={() => dispatch(setSelectedCategory(category))}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-gray-900 capitalize">{category}</span>
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Category;