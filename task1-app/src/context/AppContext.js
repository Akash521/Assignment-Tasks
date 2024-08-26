import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userFilters, setUserFilters] = useState({});
  const [productFilters, setProductFilters] = useState({});
  const [userData, setUserData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTab, setSelectedTab] = useState('ALL');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/users?limit=${pageSize}&skip=${(currentPage - 1) * pageSize}&${new URLSearchParams(userFilters)}`);
        const totalCount = response.data.total;
        setTotalPages(Math.ceil(totalCount / pageSize));
        
        const filteredData = response.data.users.map(user => ({
          firstName: user.firstName,
          lastName: user.lastName,
          maidenName: user.maidenName,
          age: user.age,
          gender: user.gender,
          email: user.email,
          username: user.username,
          bloodGroup: user.bloodGroup,
          eyeColor: user.eyeColor,
        }));
        
        setUserData(filteredData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchProductData = async () => {
      try {
        const apiEndpoint = selectedTab === 'ALL' ? 'https://dummyjson.com/products' : 'https://dummyjson.com/products/search?q=laptop';
        const response = await axios.get(apiEndpoint, {
          params: {
            limit: pageSize,
            skip: (currentPage - 1) * pageSize,
            ...productFilters
          }
        });

        const totalCount = response.data.total;
        setTotalPages(Math.ceil(totalCount / pageSize));

        const filteredData = response.data.products.map(product => ({
          id: product.id,
          title: product.title,
          price: product.price,
          category: product.category,
          stock: product.stock,
          brand: product.brand,
          thumbnail: product.thumbnail,
        }));
        
        setProductData(filteredData);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchUserData();
    fetchProductData();
  }, [pageSize, userFilters, currentPage, selectedTab, productFilters]);

  return (
    <AppContext.Provider
      value={{
        userFilters,
        setUserFilters,
        productFilters,
        setProductFilters,
        userData,
        setUserData,
        productData,
        setProductData,
        pageSize,
        setPageSize,
        currentPage,
        setCurrentPage,
        totalPages,
        selectedTab,
        setSelectedTab
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
