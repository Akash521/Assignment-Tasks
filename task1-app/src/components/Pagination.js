// src/components/Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Number of pages to show at once

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxPagesToShow; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - (maxPagesToShow - 2); i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div style={{ margin: '20px 0', textAlign: 'center' }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{ margin: '0 5px' }}
      >
        {'<'}
      </button>
      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => {
            if (page !== '...') {
              onPageChange(page);
            }
          }}
          style={{
            margin: '0 5px',
            fontWeight: currentPage === page ? 'bold' : 'normal',
            cursor: page === '...' ? 'default' : 'pointer'
          }}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{ margin: '0 5px' }}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
