// import React from 'react';
// import { BsPersonFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ islog, search, setsearch }) => {


  console.log(search)



  return (<>
    <nav className="bg-white shadow-md h-20 fixed w-full flex top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center align-middle">
        <Link to='/'><img className="font-bold h-12  sm:ml-10 text-gray-800" src=" https://res.cloudinary.com/dm2c41gia/image/upload/v1723447559/p29ql3xsfk8qw7otjt04.png"/></Link>
        <div className="flex items-center space-x-4">
        <input
  type="text"
  value={search}
  onChange={(e) => setsearch(e.target.value)}
  placeholder="search....."
  className="rounded-full w-full max-w-xs bg-white text-gray-900 placeholder-gray-500 border border-gray-300 py-2 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
/>


          {(islog) ? <Link to='/profile'> <FaUserCircle color="blue" size={30}/></Link>
            : <Link to='/Login'><button className="bg-red-500 text-white rounded-md py-1 px-4">Login</button></Link>}

        </div>
      </div>
    </nav>
  </>
  );
};

export default Navbar;
