import axios from "axios";
import { useEffect, useState } from "react";


function Home() {

    const [posts, setposts] = useState([])



    useEffect(() => {
        const fetchdata = async () => {
            const res = await axios.get('http://localhost:3000/posts')
            setposts(res.data)


        }
        fetchdata()

    }, [])



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