
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PostSkeleton = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-100">
      <div className="p-5 rounded-md bg-white sm:flex gap-4 shadow-md w-full max-w-5xl">
        <div className="sm:w-3/5 w-full">
          <Skeleton height={256} className="mb-4 rounded-md" />
          <div className="justify-end mb-4 flex gap-2">
            <Skeleton circle height={28} width={28} />
            <Skeleton circle height={28} width={28} />
            <Skeleton circle height={28} width={28} />
          </div>
          <Skeleton height={24} width="70%" className="mb-2" />
          <Skeleton count={3} height={20} className="mb-4" />
          <Skeleton height={20} width="50%" className="mb-4" />
          <div className="flex items-center mb-4">
            <Skeleton height={40} width="80%" />
            <Skeleton height={40} width="20%" className="ml-2" />
          </div>
        </div>
        <div className="sm:w-1/2 flex flex-col w-full">
          <Skeleton height={32} width="30%" className="mb-4" />
          <Skeleton count={5} height={60} className="mb-4" />
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;
