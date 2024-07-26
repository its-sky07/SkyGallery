import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useOutletContext } from "react-router-dom";


function Home() {
    const context = useOutletContext()

    const [posts, setposts] = useState([])
    const [FilteredPosts, setFilteredPosts] = useState([])



    useEffect(() => {
        try {
            const fetchdata = async () => {
                const res = await axios.get('http://localhost:3000/posts')
                setposts(res.data)
                setFilteredPosts(res.data)
            }
            fetchdata()
        } catch (error) {
            console.error("not fetching the data", error)
            toast.error("turn on the data")
        }
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
    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {posts.map((item, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                            <img src={item.imageUrl} alt="Placeholder" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            </div>



        </>)
}
export default Home