import React, { useState, useContext, useEffect, useMemo } from 'react';
import axios from 'axios';
// import { userdetail } from '../Context/Context';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  // const { user } = useContext(userdetail);
  const [userPosts, setUserPosts] = useState([]);
  const [userdetail, setuserdetail] = useState([])

  // const [image, setImage] = useState(userdetail.avatar);


  const navigate = useNavigate()
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profileimage', file);

      try {
        const response = await axios.post('http://localhost:3000/user/uploadprofileimg', formData, { withCredentials: true });
        const res = response.data;



        // setImage(`${res.avatar}?t=${new Date().getTime()}`);
        toast.success("Profile Image Updated Successfully");

      } catch (error) {
        console.error('Error uploading file', error);
        toast.error("Error uploading profile image.");
      }
    }
  };


 
  useMemo(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/posts', { withCredentials: true });
        console.log('Fetched posts:', response.data); // Debugging line
        setUserPosts(response.data.post);
        setuserdetail(response.data);
      } catch (error) {
        console.error('Error fetching user posts', error);
        toast.error("Error fetching user posts.");
      }
    };

    fetchUserData();
  }, []);



  const triggerFileInput = () => {
    document.getElementById('file-input').click();
  };

  const handleLogout = async () => {

    try {
     await axios.get('/user/logout', { withCredentials: true });
      navigate('/')

      toast.success("logout succesfully")

    } catch (error) {
      toast.error('unable to logout')

    }
  };


  return (
    <div className="profile-page">
      <div className="profile-header flex justify-start flex-col relative p-4 items-center mt-9">
        <div className='w-32 h-32 rounded-full relative'>
          <img src={userdetail.avatar} alt='Profile Picture' className='w-full h-full object-cover rounded-full' />
          <div onClick={triggerFileInput} className='p-3 bg-red-600 rounded-full absolute right-0 bottom-0 cursor-pointer'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.828 2.828a1 1 0 0 1 1.414 0l4.95 4.95a1 1 0 0 1 0 1.414l-11.314 11.314a1 1 0 0 1-.263.175l-5.207 2.075a1 1 0 0 1-1.264-1.264l2.075-5.207a1 1 0 0 1 .175-.263L14.828 2.828zM4.293 19.707l2.075-5.207 3.132 3.132-5.207 2.075zm3.182-5.896l1.828 1.828 6.364-6.364-1.828-1.828-6.364 6.364z" fill="white" />
            </svg>
          </div>
        </div>
        <h1 className="font-bold text-xl text-blue-700">@{userdetail.username}</h1>
        <h2 className="text-2xl">{userdetail.fullname}</h2>

        <form method='POST'>
          <input id="file-input" type="file" name='profileimage' onChange={handleFileChange} className="hidden" />
        </form>
        <button className='bg-red-600 p-3 rounded-xl flex text-white justify-start absolute bottom-0 right-24 ' onClick={handleLogout}>Logout</button>

        <Link to="/UploadPost">
          <button className='bg-red-600 p-3 rounded-xl flex text-white justify-start absolute left-24 '>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Add Post
          </button>
        </Link>
      </div>
      <div className="profile-posts">
        <h3 className='text-3xl font-bold text-center mt-5'>Posts</h3>
        <div className="flex flex-wrap justify-start p-5 items-center gap-3 mt-4">
          {userPosts.length > 0 ? (
            userPosts.map((item) => (
              <div key={item._id} className="p-2 rounded-md md:w-80 h-2/4 bg-red-200 sm:mb-0 mb-6 m-1">
                <div className="rounded-lg h-64 overflow-hidden">
                  <img alt="content" className="object-cover object-center h-full w-full" src={item.imageUrl} />
                </div>
                <h2 className="text-xl font-medium title-font text-gray-900 mt-5">{item.title}</h2>
                <p className="text-base leading-relaxed mt-2">{item.description}</p>
                <a className="text-indigo-500 inline-flex items-center mt-3">Learn More
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
