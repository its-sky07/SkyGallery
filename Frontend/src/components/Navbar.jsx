// import React from 'react';
// import { BsPersonFill } from "react-icons/bs";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ islog, search, setsearch }) => {


  console.log(search)



  return (<>
    <nav className="bg-white shadow-md h-20 fixed w-full flex top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center align-middle">
        <Link to='/'><div className="text-2xl font-bold text-gray-800">Pinterest Clone</div></Link>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            placeholder="Search"
            className="border border-gray-300 rounded-md py-1 px-2"
          />

          {(islog) ? <Link to='/profile'> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-6.45 1.17-8.48 3.13-.33.32-.52.76-.52 1.21v.16c0 .93.74 1.7 1.66 1.7h14.68c.92 0 1.66-.77 1.66-1.7v-.16c0-.45-.19-.89-.52-1.21C18.45 15.17 15.33 14 12 14z" />
          </svg></Link>
            : <Link to='/Login'><button className="bg-red-500 text-white rounded-md py-1 px-4">Login</button></Link>}

        </div>
      </div>
    </nav>
  </>
  );
};

export default Navbar;
