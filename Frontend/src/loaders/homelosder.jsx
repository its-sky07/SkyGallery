const SkeletonLoader = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-t-4 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 border-4 border-b-4 border-b-red-500 rounded-full animate-spin-reverse"></div>
        <div className="absolute inset-0 w-16 h-16 bg-white rounded-full"></div>
      </div>
    </div>
    );
  };
  export default SkeletonLoader;
  