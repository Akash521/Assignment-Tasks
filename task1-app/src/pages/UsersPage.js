import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import DataTable from '../components/DataTable';
import Pagination from '../components/Pagination';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const UsersPage = () => {
  const {
    userData,
    setPageSize,
    currentPage,
    setCurrentPage,
    totalPages
  } = useContext(AppContext);

  const columns = ['firstName','lastName','maidenName','age', 'gender', 'email', 'username', 'bloodGroup', 'eyeColor'];

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

  return (
    <div style={{ fontFamily: 'Neutra Text', color: '#322625', padding: '20px' }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Home
        </Link>
        <Typography color="textPrimary" className='highlight'>Users</Typography>
      </Breadcrumbs>
      <div style={{ marginTop: '20px' }}>
        <DataTable
          columns={columns}
          data={userData}
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

export default UsersPage;
