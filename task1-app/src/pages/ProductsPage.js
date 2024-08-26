import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import DataTable from '../components/DataTable';
import Pagination from '../components/Pagination';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Tabs, Tab } from '@mui/material';

const ProductPage = () => {
  const {
    productData,
    setPageSize,
    currentPage,
    setCurrentPage,
    totalPages,
    selectedTab,
    setSelectedTab
  } = useContext(AppContext);

  const columns = ['title', 'price', 'category', 'stock', 'brand', 'thumbnail'];

  const handleSort = (key, direction) => {
    console.log(`Sort by ${key} in ${direction} order`);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(Number(size));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div style={{ fontFamily: 'Neutra Text', color: '#322625', padding: '20px' }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Home
        </Link>
        <Typography color="textPrimary" className='highlight'>Products</Typography>
      </Breadcrumbs>
      <div>
        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="product tabs">
          <Tab value="ALL" label="ALL" />
          <Tab value="Laptops" label="Laptops" />
        </Tabs>
      </div>
      <div style={{ marginTop: '20px' }}>
        <DataTable
          columns={columns}
          data={productData}
          onSort={handleSort}
          onPageSizeChange={handlePageSizeChange}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProductPage;
