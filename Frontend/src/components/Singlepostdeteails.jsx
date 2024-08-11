import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

const SinglePostPage = () => {
  const context = useOutletContext()

  const { postid } = useParams();
  const [Post, setPost] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [isliked, setisliked] = useState(false)
  const [likelength, setlikelength] = useState(null)
  const [loading, setloading] = useState(true)
  const [opendeletemodal, setopendeletemodal] = useState(false)
  const [commettodelete, setcommettodelete] = useState(null)
  const [deletepostid, setdeletepostid] = useState(null)
  const [opendeletepostmodal, setopendeletepostmodal] = useState(false)
  const [privacy, setprivacy] = useState(true)



  const baseurl=import.meta.env.VITE_API_URL


  const navigate = useNavigate()

  const handleprivacy = (e) => {
    setprivacy(e.target.checked);
    console.log(privacy)
  };


  const handleNewDetails = async () => {

    try {
      if (!newTitle || !newDescription) {
        return toast.error("pls fill all the filled")
      }
      const updatedPost = {

        title: newTitle,
        description: newDescription,
        privacy: privacy
      };
      const response = await axios.put(`${baseurl}/posts/updatepostinfo/${postid}`, updatedPost, { withCredentials: true });
      setPost(response.data);
      toast.success("Post updated successfully!");
      toggleModal();
    } catch (error) {
      console.error('Error updating post', error);
      toast.error("Error updating post.");
    } finally {
      setloading(false)
    }
  };



  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${baseurl}/posts/${postid}`, { withCredentials: true });
        setPost(response.data);
        setlikelength(response.data.likes.length);

        setprivacy(response.data.private)

        if (context.user) {
          setisliked(response.data.likes.includes(context.user._id));
        }
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching post', error);
        toast.error("Error fetching post.");
      } finally {
        setloading(false)
      }
    };

    fetchPost();
  }, [postid, context.user, isliked, isModalOpen ,comment]);


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${baseurl}/posts/${postid}/comment`, { withCredentials: true });
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
      await axios.post(`${baseurl}/posts/${postid}/comment`, { text: comment }, { withCredentials: true });
      setComment("");
      toast.success("Comment added successfully!");
      // Fetch comments again to display the new comment
      const response = await axios.get(`${baseurl}/posts/${postid}/comment`, { withCredentials: true });
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
      const res = await axios.delete(`${baseurl}/posts/${postid}/comment/${commentid}`, { withCredentials: true })
      if (res.status === 200) {

        setAllComments(prevComments => prevComments.filter(comment => comment._id !== commentid));

        toast.success("comment deleted succesfully")
        togglecommentdelete()

      }
    } catch (error) {
      console.error('Error deleting comment', error);

    }



  }

  const handledeletepost = async (postid) => {
    await axios.delete(`${baseurl}/posts/${postid}`, { withCredentials: true })
    navigate("/profile")

  }

  const downloadImage = async (imageUrl) => {
    try {
      // Fetch the image as a Blob
      const secureImageUrl = imageUrl.replace(/^http:\/\//i, 'https://');
      const response = await fetch(secureImageUrl, {
        mode: 'cors', // Ensure CORS is handled if needed
      });
  
      // If the response is not ok, throw an error
      if (!response.ok) {
        throw new Error('Image download failed');
      }
  
      // Convert the response to a Blob
      const blob = await response.blob();
  
      // Create a temporary URL for the Blob
      const url = window.URL.createObjectURL(blob);
  
      // Create an anchor element and trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'image.jpg';
      document.body.appendChild(link);
      link.click();
  
      // Clean up by revoking the object URL and removing the link
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading the image', error);
      toast.error('Error downloading the image.');
    }
  };
  
  
  
  const handlelike = async () => {
    try {
      if (isliked) {
        const dislike = await axios.post(`${baseurl}/posts/${postid}/unlikes`, {}, { withCredentials: true });
        toast.success(dislike.data);

      } else {
        const like = await axios.post(`${baseurl}/posts/${postid}/likes`, {}, { withCredentials: true });
        toast.success(like.data);

      }
      setisliked(!isliked)
    } catch (error) {
      console.error('Error handling like/unlike', error);
      toast.error("Error handling like/unlike.");
    }
  };

  const togglecommentdelete = (commentid) => {
    setopendeletemodal(!opendeletemodal)
    setcommettodelete(commentid)

    console.log(opendeletemodal)
  }
  const togglepostdelete = (postid) => {
    setdeletepostid(postid)
    setopendeletepostmodal(!opendeletepostmodal)

  }
  const comfirmdelete = () => {
    handledeletecomment(commettodelete)

  }
  const comfirmdeletepost = () => {
    handledeletepost(deletepostid)
  }


  if (loading) return <div className="flex items-center justify-center min-h-screen">
    <div className="w-20 h-20 border-4 border-blue-700 rounded-full border-dotted animate-spin"></div>
  </div>;

  const handleBack = () => {
    window.history.back()

  }

  return (
    <div className="flex justify-center items-center min-h-screen w-full  bg-gray-100">


      <button onClick={handleBack} className='absolute top-20 left-32 bg-blue-600 p-2 rounded-lg  text-white'>
        <p className='flex align-middle justify-center'> <svg
          // Example event handler
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8"
        >
          <path
            d="M19 12H5M12 19l-7-7 7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg><p className='font-medium '>back</p></p>
       

      </button>
      <div className=" p-5 rounded-md bg-white sm:flex mt-14 gap-4 shadow-md w-full max-w-5xl">
        <div className=" sm:w-3/5 w-full">
          {Post.imageUrl && (
            <div className="post-image w-full h-64 mb-4 ">
              <img src={Post.imageUrl} alt="Post" className="w-full h-full object-cover rounded-md" />
            </div>
          )}
          <div className=" justify-end mb-4 flex gap-2">


            {/* like */}

            {(isliked) ? <svg
              onClick={handlelike}
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="red"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg> : <svg
              onClick={handlelike}
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1 18.55L12 18.65l-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5 18.5 5 20 6.5 20 8.5c0 2.89-3.14 5.74-7.9 10.05z"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>}
            {likelength}

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

            {context.user && Post.user && context.user._id === Post.user._id && (<>   <svg onClick={() => togglepostdelete(postid)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-red-700">
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
              </button></>)

            }







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

          {(allComments.length <= 0) ? "no comment on this post" : <div className="h-96 overflow-y-scroll scroll-smooth pr-4">
            {allComments.map((item) => (
              <div key={item._id} className="bg-gray-100 rounded-xl flex justify-evenly gap-2 p-4 mb-4">
                <div className="h-7 w-7 rounded-full overflow-hidden">
                  <img className="h-full w-full object-cover" src={item.user.avatar} alt="" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="text-blue-500 font-semibold">@{item.user.username}</h4>
                  <p className="break-words">{item.text}</p>
                </div>


                {context.user && Post.user && (item.user._id == context.user._id || Post.user._id == context.user._id) &&
                  (<svg onClick={() => togglecommentdelete(item._id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-red-700">
                    <path d="M3 6h18" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6h14z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 11v6m4-6v6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>)
                }
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
                  required
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  name="description"
                  id="description"
                  rows="10"
                  required
                  placeholder="Enter new description"
                  className="w-full p-2 border border-gray-300 rounded-md"
                ></textarea>
              </div>
              <div className="p-4">
                <p className='flex items-center gap-2'>
                  <input
                    type="checkbox"
                    checked={privacy}
                    onChange={handleprivacy}
                    id="checkprvcy"
                    className="sr-only"
                  />
                  <label
                    htmlFor="checkprvcy"
                    className="relative inline-flex items-center cursor-pointer"
                  >
                    <span className={`block w-14 h-8 rounded-full transition ${privacy ? 'bg-green-500' : 'bg-gray-200'}`}></span>
                    <span
                      className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition transform ${privacy ? 'translate-x-6' : ''}`}
                    ></span>
                  </label>
                  <label htmlFor="checkprvcy" className="block text-sm font-medium text-gray-600">
                    Post private
                  </label>
                </p>
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
      {opendeletemodal && (
        <div class="absolute p-4 w-full max-w-md max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
              <svg onClick={togglecommentdelete} class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <button onClick={togglecommentdelete} class="sr-only">Close modal</button>
            </button>
            <div class="p-4 md:p-5 text-center">
              <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
              <button onClick={comfirmdelete} data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                Yes, I'm sure
              </button>
              <button onClick={togglecommentdelete} data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
            </div>
          </div>
        </div>
      )}
      {opendeletepostmodal && (
        <div class="absolute p-4 w-full max-w-md max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
              <svg onClick={togglepostdelete} class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <button onClick={togglepostdelete} class="sr-only">Close modal</button>
            </button>
            <div class="p-4 md:p-5 text-center">
              <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
              <button onClick={comfirmdeletepost} data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                Yes, I'm sure
              </button>
              <button onClick={togglepostdelete} data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePostPage;
