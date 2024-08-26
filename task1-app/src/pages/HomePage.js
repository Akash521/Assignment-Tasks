// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.linkContainer}>
        <Link to="/users" style={styles.link}>Users</Link>
        <Link to="/products" style={styles.link}>Products</Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#ebebeb',
    color: '#322625',
    fontFamily: 'Neutra Text',
  },
  linkContainer: {
    textAlign: 'center',
  },
  link: {
    display: 'block',
    fontSize: '24px',
    color: '#007bff',
    textDecoration: 'none',
    margin: '10px',
  },
};

export default HomePage;
