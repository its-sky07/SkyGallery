import axios from "axios";
import { lazy, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import SkeletonLoader from "../loaders/homelosder";


function Home() {
    const context = useOutletContext()

    const [posts, setposts] = useState([])
    const [FilteredPosts, setFilteredPosts] = useState([])
    const [loading, setloading] = useState(true)
    const navigate = useNavigate()
    const baseurl=import.meta.env.VITE_API_URL
    useEffect(() => {

        const fetchdata = async () => {
            try {
                const res = await axios.get(`${baseurl}/posts`)
                setposts(res.data)
                setFilteredPosts(res.data)
            }

            catch (error) {
                console.error("not fetching the data", error)
                toast.error("turn on the data")
            } finally {
                setloading(false)
            }
        }
        fetchdata()
    }, [])

    useEffect(() => {
        const filterPosts = () => {
            const filtered = FilteredPosts.filter((item) =>
                item.title.toLowerCase().includes(context.search.toLowerCase())
            );
            setposts(filtered);
        };
        filterPosts();
    }, [context.search]);

    const handlepostinfo = (postId) => {
        navigate(`/Singlepostpage/${postId}`)
    }


    if (loading) return  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="relative w-24 h-24">
      <div className="absolute inset-0 border-4 border-t-4 border-t-blue-500 rounded-full animate-spin"></div>
      <div className="absolute inset-0 border-4 border-b-4 border-b-red-500 rounded-full animate-spin-reverse"></div>
      <div className="absolute inset-0 w-16 h-16 bg-white rounded-full"></div>
    </div>
  </div>

    return (
        <>
        {(posts.length)?
             <div className="container mx-auto px-4 py-8 mt-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {posts.map((item, index) => (
                        <div key={index} className= "h-96 bg-white rounded-lg overflow-hidden shadow-md">
                            <Link to="#" onClick={() => handlepostinfo(item._id)}>   <img src={item.imageUrl} loading={lazy} alt="Placeholder" className="w-full h-full object-cover object-center" /></Link>
                        </div>
                    ))}
                </div>
            </div>: <div className="flex flex-col items-center justify-center text-center p-10 bg-gray-100 rounded-md w-full">
    {/* <MdEdit className="text-6xl text-gray-400 mb-4" /> */}
    <h3 className="text-xl mt-20 font-semibold text-gray-600">No posts uploaded yet</h3>
    <p className="text-gray-500">Start by uploading your first post!</p>
  </div>
  }  </>)
}
export default Home