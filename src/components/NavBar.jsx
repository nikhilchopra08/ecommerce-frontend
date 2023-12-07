import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
    <div className='navBar'>
      <div className="logo">
        <h>Logo</h>
      </div>
    <div className='Links'>
    <Link to="/">home</Link>
 <Link to="/login">hello</Link>
 <Link to="/orders">Orders</Link>
 <Link to="/products">Products</Link>
        </div>

        <div className='Profile'>
          <h>Profile</h>
        </div>
        </div>
    </>
  );
};

export default NavBar;
