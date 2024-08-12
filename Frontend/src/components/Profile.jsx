import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { FaPlus, FaSignOutAlt } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

const Profile = () => {
  const context = useOutletContext();
  const [userPosts, setUserPosts] = useState([]);
  const [userdetail, setUserDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const baseurl = import.meta.env.VITE_API_URL;

 
    const handleFileChange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('profileimage', file);
  
        
        try {
          await axios.post(`${baseurl}/user/uploadprofileimg`, formData, { withCredentials: true });
          toast.success("Profile Image Updated Successfully");
        } catch (error) {
          console.error('Error uploading file', error);
          toast.error("Error uploading profile image.");
        }
      }
    };
    useEffect(() => {
     handleFileChange()
    }, [])
    
    
 
  

 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseurl}/user/posts`, { withCredentials: true });
        setUserPosts(response.data.post);
        setUserDetail(response.data);
      } catch (error) {
        console.error('Error fetching user posts', error);
        toast.error("Error fetching user posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const triggerFileInput = () => {
    document.getElementById('file-input').click();
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${baseurl}/user/logout`, { withCredentials: true });
      navigate('/login');
      context.setisloggedin(false);
      toast.success("Logout successfully");
    } catch (error) {
      toast.error('Unable to logout');
    }
  };

  const openSinglePage = (postId) => {
    navigate(`/Singlepostpage/${postId}`);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-20 h-20 border-4 border-blue-700 rounded-full border-dotted animate-spin"></div>
    </div>
  );

  return (
    <div className="profile-page p-4 sm:p-8">
      <div className="profile-header flex flex-col items-center relative mt-20 sm:mt-24">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full relative">
          <img src={userdetail.avatar} alt="Profile" className="w-full h-full object-cover rounded-full" />
          <div onClick={triggerFileInput} className="p-2 sm:p-3 bg-blue-600 rounded-full absolute right-0 bottom-0 cursor-pointer">
            <MdEdit className="text-white w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
        <h1 className="font-bold text-lg sm:text-2xl text-blue-700 mt-4">@{userdetail.username}</h1>
        <h2 className="text-md sm:text-xl text-gray-700">{userdetail.fullname}</h2>

        <form method="POST">
          <input id="file-input" type="file" name="profileimage" onChange={handleFileChange} className="hidden" />
        </form>
        <button className="bg-red-600 p-2 sm:p-3 rounded-full flex items-center text-white absolute top-0 right-5 sm:right-24" >
          <FaSignOutAlt onClick={handleLogout}  />
        </button>

        <Link to="/UploadPost">
          <button className="bg-blue-600 p-2 sm:p-3 rounded-xl flex items-center text-white mt-4 sm:mt-0 absolute left-5 sm:left-10">
            <FaPlus className="mr-2" /> Add Post
          </button>
        </Link>
      </div>

      <div className="profile-posts mt-12">
        <div className="grid gap-6 mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {userPosts.length > 0 ? (
            userPosts.map((item) => (
              <div key={item._id} className="bg-gray-100 p-4 rounded-lg shadow-lg hover:shadow-xl mt-3 transition-shadow duration-300">
                <div className="rounded-lg overflow-hidden">
                  <Link to="#" onClick={() => openSinglePage(item._id)}>
                    <img alt="content" className="object-cover object-center h-48 w-full" src={item.imageUrl} />
                  </Link>
                </div>
                <h2 className="text-xl font-medium text-gray-800 mt-4">{item.title}</h2>
                <p className="text-gray-600 mt-2 overflow-hidden">{item.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <Link to="#" className="text-blue-600 hover:text-blue-800 transition" onClick={() => openSinglePage(item._id)}>
                    View more
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full flex flex-col items-center justify-center text-center p-10 bg-gray-100 rounded-md">
              <MdEdit className="text-6xl text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600">No posts uploaded yet</h3>
              <p className="text-gray-500">Start by uploading your first post!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
