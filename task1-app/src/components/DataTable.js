// src/components/DataTable.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const DataTable = ({ columns, data, onSort, onPageSizeChange }) => {
  const [search, setSearch] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    onSort(key, direction);
  };

  const handlePageSizeChange = (e) => {
    if (onPageSizeChange) {
      onPageSizeChange(Number(e.target.value));
    }
  };

  const sortedData = React.useMemo(() => {
    const sortedArray = [...data];
    if (sortConfig.key) {
      sortedArray.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortedArray;
  }, [data, sortConfig]);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <select
          onChange={handlePageSizeChange}
          style={{ marginRight: '10px' }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <span style={{ marginRight: '10px' }}>Entries</span>
        <button
          onClick={() => setSearchVisible(!searchVisible)}
          style={{ marginRight: '10px' }}
        >
          🔍
        </button>
        {searchVisible && (
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            style={{ marginRight: '10px' }}
          />
        )}
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                style={{ padding: '10px', borderBottom: '1px solid #ddd', cursor: 'pointer' }}
                onClick={() => handleSort(column)}
              >
                {column.charAt(0).toUpperCase() + column.slice(1)}
                <span style={{ marginLeft: '5px' }}>
                  {sortConfig.key === column
                    ? (sortConfig.direction === 'asc' ? '🔼' : '🔽')
                    : '⬍'}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData
            .filter(row => {
              if (!search) return true;
              return Object.values(row).some(value =>
                value.toString().toLowerCase().includes(search.toLowerCase())
              );
            })
            .map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                    {column === 'thumbnail' ? (
                      <img src={row[column]} alt={row.title} style={{ maxWidth: '100px', height: 'auto' }} />
                    ) : (
                      row[column]
                    )}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSort: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
};

export default DataTable;
