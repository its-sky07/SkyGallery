import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const UploadPost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [privacy, setPrivacy] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const baseurl = import.meta.env.VITE_API_URL;
  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Validate form fields

  if (!title || !description || !selectedFile) {
    return toast.error("Please fill in all fields and select a file.");

  }

  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('post', selectedFile);
  formData.append('privacy', privacy);


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      await axios.post(`${baseurl}/posts/upload`, formData, { withCredentials: true });
      toast.success("Post uploaded successfully");
      navigate("/profile");
      // Clear the form
      setTitle('');
      setDescription('');
      setSelectedFile(null);
      setPrivacy(false);
    } catch (error) {
      console.error('Error uploading post', error);
      toast.error("Error uploading post. Please try again.");
    } finally {
      setLoading(false);
    }
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
          <p className='flex gap-2 items-center'>
            <input
              type="checkbox"
              name="checkprvcy"
              onChange={(e) => setPrivacy(e.target.checked)}
              id="checkprvcy"
              checked={privacy}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="checkprvcy" className="block text-sm font-medium text-gray-600">Post private</label>
          </p>
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2 font-medium text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} focus:ring-blue-500`}
            >
              {loading ? 'Uploading...' : 'Upload Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadPost;
