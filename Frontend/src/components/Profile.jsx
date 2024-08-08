import React, { useState, useContext, useEffect, useMemo } from 'react';
import axios from 'axios';
// import { userdetail } from '../Context/Context';
import toast from 'react-hot-toast';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';

const Profile = () => {
  const context=useOutletContext()
  const [userPosts, setUserPosts] = useState([]);
  const [userdetail, setuserdetail] = useState([])
  const [loading, setloading] = useState(true)
  const navigate = useNavigate()

  const baseurl=import.meta.env.VITE_API_URL

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

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseurl}/user/posts`, { withCredentials: true });
        console.log('Fetched posts:', response.data); // Debugging line
        setUserPosts(response.data.post);
        setuserdetail(response.data);
      } catch (error) {
        console.error('Error fetching user posts', error);
        toast.error("Error fetching user posts.");
      }finally{
        setloading(false)
      }
    };

    fetchUserData();
  }, [userdetail]);

  const triggerFileInput = () => {
    document.getElementById('file-input').click();
  };

  const handleLogout = async () => {

    try {
      await axios.get(`${baseurl}/user/logout`, { withCredentials: true });
      navigate('/login')
      context.setisloggedin(false)

      toast.success("logout succesfully")

    } catch (error) {
      toast.error('unable to logout')

    }
  };
  const handleDeletePost = async (postId) => {
    try {

       await axios.delete(`${baseurl}/posts/${postId}`, { withCredentials: true })
      setUserPosts(userPosts.filter((post) => (post._id !== postId)))
      toast.success("Post deleted successfully")
      console.log("post deleted")

    } catch (error) {
      console.error("error on deleting post", error)
      toast.error("unable to delete post")

    }

  }
  const opensinglepage = (postId) => {
    navigate(`/Singlepostpage/${postId}`)
  }

  if (loading) return <div className="flex items-center justify-center min-h-screen">
  <div className="w-20 h-20 border-4 border-blue-700 rounded-full border-dotted animate-spin"></div>
</div>;

  return (
    <div className="profile-page ">
      <div className="profile-header flex justify-start flex-col relative p-4 items-center mt-24  ">
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
        <button className='bg-red-600 p-3 rounded-xl flex text-white justify-start absolute top-0 right-24 ' onClick={handleLogout}>Logout</button>

        <Link to="/UploadPost">
          <button className='bg-red-600 p-3 rounded-xl flex text-white justify-start absolute left-10 '>
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
              <div key={item._id} className="p-2 rounded-md sm:w-80 w-full h-2/4 bg-red-200 sm:mb-0 mb-6 m-1">
                <div className="rounded-lg h-64 overflow-hidden">
                  <Link to="#" onClick={() => opensinglepage(item._id)}>
                    <img alt="content" className="object-cover object-center h-full w-full" src={item.imageUrl} />
                  </Link>
                </div>
                <h2 className="text-xl font-medium title-font text-gray-900 mt-5">{item.title}</h2>
                <p className="text-base leading-relaxed mt-2">{item.description}</p>
              <p >
                <Link to="#" className='flex text-red-700' onClick={() => opensinglepage(item._id)}>see more
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                  </Link>

                  </p> 
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
