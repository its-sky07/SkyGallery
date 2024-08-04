import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const SinglePostPage = () => {
  const { postid } = useParams();
  const [Post, setPost] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);


  const navigate = useNavigate()
  const handleNewDetails = async () => {
    try {
      const updatedPost = {

        title: newTitle,
        description: newDescription
      };
      const response = await axios.put(`http://localhost:3000/posts/updatepostinfo/${postid}`, updatedPost, { withCredentials: true });
      setPost(response.data);
      toast.success("Post updated successfully!");
      toggleModal();
    } catch (error) {
      console.error('Error updating post', error);
      toast.error("Error updating post.");
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/${postid}`, { withCredentials: true });
        setPost(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching post', error);
        toast.error("Error fetching post.");
      }
    };

    fetchPost();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/${postid}/comment`, { withCredentials: true });
        setAllComments(response.data);
      } catch (error) {
        console.error('Error fetching comments', error);
      }
    };
    fetchComments();
  }, []);

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/posts/${postid}/comment`, { text: comment }, { withCredentials: true });
      setComment("");
      toast.success("Comment added successfully!");
      // Fetch comments again to display the new comment
      const response = await axios.get(`http://localhost:3000/posts/${postid}/comment`, { withCredentials: true });
      setAllComments(response.data);
    } catch (error) {
      console.error('Error adding comment', error);
      toast.error("Error adding comment.");
    }
  };

  useEffect(() => {
    handleComment()
  }, [])

  const handledeletecomment = async (commentid) => {


    try {
      const res = await axios.delete(`http://localhost:3000/comments/${commentid}`, { withCredentials: true })
      if (res.status === 200) {

        setAllComments(prevComments => prevComments.filter(comment => comment._id !== commentid));

        toast.success("comment deleted succesfully")

      }
    } catch (error) {
      console.error('Error deleting comment', error);

    }



  }

  const handledeletepost = async (postid) => {
    await axios.delete(`http://localhost:3000/posts/${postid}`, { withCredentials: true })
    navigate("/profile")

  }

  const downloadImage = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'image.jpg'; // Set the default file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Clean up the URL object
    } catch (error) {
      console.error('Error downloading the image', error);
    }
  };




  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-100">
      <div className=" p-5 rounded-md bg-white sm:flex gap-4 shadow-md w-full max-w-5xl">
        <div className=" sm:w-3/5 w-full">
          {Post.imageUrl && (
            <div className="post-image w-full h-64 mb-4 ">
              <img src={Post.imageUrl} alt="Post" className="w-full h-full object-cover rounded-md" />
            </div>
          )}
          <div className=" justify-end mb-4 flex gap-2">

            {/* downloadbutton */}
            <svg
              onClick={() => downloadImage(Post.imageUrl)}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path
                d="M12 2v14m0 0l-4-4m4 4l4-4M4 20h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* deletebutton */}
            <svg onClick={() => handledeletepost(postid)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-red-700">
              <path d="M3 6h18" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6h14z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 11v6m4-6v6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <button
              onClick={toggleModal}
              className="bg-blue-700 flex text-white p-2 rounded-lg"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 20" fill="currentColor" className="w-6 h-6">
                <path d="M21.7,2.3c-0.4-0.4-1-0.4-1.4,0L18.4,4.2c-0.4,0.4-0.4,1,0,1.4l1.4,1.4c0.4,0.4,1,0.4,1.4,0l1.9-1.9c0.4-0.4,0.4-1,0-1.4 L21.7,2.3z M17.3,6.7L4.1,19.9c-0.2,0.2-0.3,0.4-0.4,0.7l-1,4.1c-0.1,0.5,0.4,1,1,0.9l4.1-1c0.3-0.1,0.5-0.2,0.7-0.4L20.7,10.1 L17.3,6.7z" />
              </svg>
              Edit
            </button>
          </div>
          <h2 className="text-2xl font-bold mb-2">{Post.title}</h2>
          <p className="text-gray-700 mb-4">{Post.description}</p>
          {Post.user && <p className="text-gray-500 mb-4">Posted by: <span className="text-blue-700 font-semibold">{Post.user.fullname}</span></p>}
          <div className="flex items-center mb-4">
            <form onSubmit={handleComment} className="flex items-center w-full">
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment"
              />
            </form>
            <button
              type="submit"
              className="ml-2 bg-blue-700 text-white p-2 rounded-lg"
              onClick={handleComment}
            >
              Post
            </button>
          </div>
        </div>
        <div className="sm:w-1/2 flex flex-col sp  w-full">
          <h2 className="font-bold text-2xl mb-4">Comments</h2>

          {(allComments.length <= 0) ? "no comment on this post" : <div className="h-96 overflow-y-scroll pr-4">
            {allComments.map((item) => (
              <div key={item._id} className="bg-gray-100 rounded-xl flex justify-evenly gap-2 p-4 mb-4">
                <div className="h-7 w-7 rounded-full overflow-hidden">
                  <img className="h-full w-full object-cover" src={item.user.avatar} alt="" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="text-blue-500 font-semibold">@{item.user.username}</h4>
                  <p className="break-words">{item.text}</p>
                </div>
                <svg onClick={() => handledeletecomment(item._id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-red-700">
                  <path d="M3 6h18" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6h14z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 11v6m4-6v6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ))}
          </div>}

        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg relative">
              <div className="flex items-center justify-between p-4 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">Enter new details</h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                  onClick={toggleModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 space-y-4">
                <input
                  type="text"
                  placeholder="Enter new title"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  name="description"
                  id="description"
                  rows="10"
                  placeholder="Enter new description"
                  className="w-full p-2 border border-gray-300 rounded-md"
                ></textarea>
              </div>
              <div className="flex items-center p-4 border-t border-gray-200 rounded-b">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={handleNewDetails}
                >
                  Proceed
                </button>
                <button
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                  onClick={toggleModal}
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SinglePostPage;
