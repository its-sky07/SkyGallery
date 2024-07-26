import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const UploadPost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
const [privacy, setprivacy] = useState(false)



  const navigate = useNavigate()
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !selectedFile) {
      toast.error("Please fill in all fields and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('post', selectedFile);
    formData.append('privacy', privacy);

    try {
      const response = await axios.post('http://localhost:3000/posts/upload', formData, { withCredentials: true });
      toast.success("Post uploaded successfully");
      navigate("/profile")
      // Clear the form
      setTitle('');
      setDescription('');
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading post', error);
      toast.error("Error uploading post.");
    }
  };
  const handleprivacy=(e)=>{
    setprivacy(e.target.checked);
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">Upload a New Post</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter the post title"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter the post description"
              rows="4"
            />
          </div>
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">File</label>
            <input
              type="file"
              id="file"
              name="post"
              onChange={handleFileChange}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <p className='flex gap-2 '>
            <input type="checkbox" name="checkprvcy"  onChange={handleprivacy} id="checkprvcy" />
            <label htmlFor="checkprvcy" className="block text-sm font-medium text-gray-600">Post private</label>
          </p>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Upload Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadPost;
