import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { userdetail } from '../Context/Context';
import toast from 'react-hot-toast'
const Profile = () => {


const { user } = useContext(userdetail);
const [selectedFile, setSelectedFile] = useState(null);

const handleFileChange = (e) => {
  setSelectedFile(e.target.files[0]);
};

const handleUpload = async (e) => {
  e.preventDefault();
  if (!selectedFile) {
    alert("Please select a file first.");
    return;
  }
  const formData = new FormData();
  formData.append('profileimage', selectedFile);


  try {
    console.log(selectedFile)
    const response = await axios.post('http://localhost:3000/user/uploadprofileimg',formData,{withCredentials:true});
    
    console.log(response.data)
    toast.success("file updoaded");
   
    // You can also update the user's profile picture URL here if needed
  } catch (error) {
    console.error('Error uploading file', error);
  }
};

    return (
        <div className="profile-page">
            <div className="profile-header flex justify-center flex-col items-center mt-9">
                <div className='w-32 h-32 rounded-full overflow-hidden'>
                    <img src={user.avatar} alt='Profile Picture' className='w-full h-full object-cover' />
                </div>

                <h1 className="username">{user.username}</h1>
                <h2 className="fullname">{user.fullname}</h2>

                <form method='POST' onSubmit={handleUpload} >
                <input type="file" name='profileimage'   onChange={handleFileChange} />
                <input type="submit"  value='update image'/>
                </form>
            </div>
            <div className="profile-posts">
                <h3>Posts</h3>
                
                {/* {profile.posts.length > 0 ? (
          <ul>
            {profile.posts.map((post, index) => (
              <li key={index}>
                <h4>{post.title}</h4>
                <p>{post.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts yet.</p>
        )} */}
            </div>
        </div>
    );
};

export default Profile;
