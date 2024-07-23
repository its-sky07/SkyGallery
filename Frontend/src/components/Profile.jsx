import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { userdetail } from '../Context/Context';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useContext(userdetail);
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(user.avatar);
  const [userposts, setuserposts] = useState([]); // Initialize as an empty array

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const postres = await axios.get('http://localhost:3000/user/posts', { withCredentials: true });
        console.log('Fetched posts:', postres.data); // Debugging line
        setuserposts(postres.data);
      } catch (error) {
        console.error('Error fetching user posts', error);
        toast.error("Error fetching user posts.");
      }
    };
    fetchdata();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append('profileimage', selectedFile);

    try {
      const response = await axios.post('http://localhost:3000/user/uploadprofileimg', formData, { withCredentials: true });
      const res = response.data;

      if (res.avatar) {
        setImage(`${res.avatar}?t=${new Date().getTime()}`);
      } else {
        toast.error("Failed to update profile image.");
      }

      toast.success("Profile Image Updated Successfully");
    } catch (error) {
      console.error('Error uploading file', error);
      toast.error("Error uploading profile image.");
    } finally {
      setSelectedFile(null);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header flex justify-center flex-col items-center mt-9">
        <div className='w-32 h-32 rounded-full overflow-hidden'>
          <img src={image} alt='Profile Picture' className='w-full h-full object-cover' />
        </div>
        <h1 className="font-bold text-xl text-blue-700">@{user.username}</h1>
        <h2 className="text-2xl">{user.fullname}</h2>

        <form method='POST' onSubmit={handleUpload}>
          <input type="file" name='profileimage' onChange={handleFileChange} />
          <input className='bg-gray-600 p-3 rounded-xl text-white' type="submit" value='Update Image' />
        </form>

        <Link to="/UploadPost">
          <div className='bg-red-600 p-3 rounded-xl'>add post</div>
        </Link>

        <div className="profile-posts">
          <h3 className='text-3xl font-bold text-center mt-5'>Posts</h3>
          <div className="flex flex-wrap justify-center  flex-start items-center gap-3 mt-4">
            {userposts.length > 0 ? (
              userposts.map((item) => (
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
    </div>
  );
};

export default Profile;
