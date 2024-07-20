

function Home() {

    const images = [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/200",
        "https://via.placeholder.com/250",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/350",
        "https://via.placeholder.com/400",
        "https://via.placeholder.com/450",
        "https://via.placeholder.com/500",
        "https://via.placeholder.com/550",
        "https://via.placeholder.com/600"
    ];

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((src, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                            <img src={src} alt="Placeholder" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            </div>



        </>)

}

export default Home