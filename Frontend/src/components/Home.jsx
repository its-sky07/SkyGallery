import axios from "axios";
import { useEffect, useState } from "react";
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


    if (loading) return <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
                <SkeletonLoader key={index} />
            ))}
        </div>
    </div>

    return (
        <>
             <div className="container mx-auto px-4 py-8 mt-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {posts.map((item, index) => (
                        <div key={index} className= "h-96 bg-white rounded-lg overflow-hidden shadow-md">
                            <Link to="#" onClick={() => handlepostinfo(item._id)}>   <img src={item.imageUrl} alt="Placeholder" className="w-full h-full object-cover" /></Link>
                        </div>
                    ))}
                </div>
            </div>
        </>)
}
export default Home