import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaEyeSlash ,FaEye} from "react-icons/fa";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    fullname:"",
    email: "",
    password: ""
  });
  const [password, setpassword] = useState(true)

  const baseurl=import.meta.env.VITE_API_URL
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username,fullname , email, password } = formData;

    if (!username ||!fullname || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await axios.post(`${baseurl}/user/register`, formData);
      toast.success('Registered successfully');
      navigate("/Login");
    } catch (error) {
      console.error(error);
      toast.error('email or username allready taken');
    }
  };
  const handlepassword=()=>{
    setpassword(!password)

  }

  return (
    <>

      <div className="flex items-center justify-center min-h-screen bg-gray-500">
        <div className="bg-white w-96 h-auto p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <img
              src=" https://res.cloudinary.com/dm2c41gia/image/upload/v1723447559/p29ql3xsfk8qw7otjt04.png"
              alt="skylogo logo"
              className="w-24 mx-auto"
            />
            <p className="text-2xl font-bold mt-4 mb-2">Sign up to see more</p>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full h-12 my-1 p-3 text-sm text-gray-700 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
              <input
                type="text"
                name="fullname"
                placeholder="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="w-full h-12 my-1 p-3 text-sm text-gray-700 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-12 my-1 p-3 text-sm text-gray-700 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
              <div className='flex'>
              <input
               type={(password?"password":"text")}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-12 my-1 p-3 text-sm text-gray-700 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
              {(password)?<FaEyeSlash onClick={handlepassword} className='p-2 ' size={50} />:<FaEye onClick={handlepassword} className='p-2 ' size={50}/>}
              </div>
              <button
                type="submit"
                className="w-full h-10 mt-4 mb-2 bg-blue-600 text-white text-lg font-bold rounded-full hover:bg-red-700"
              >
                Sign up
              </button>
            </form>

           

            <footer className="mt-4">
              <p className="text-xs mb-2 opacity-70">
                By continuing, you agree to SkyGallery{" "}
                <b>Terms of Service, SkyGallery Policy.</b>
              </p>
              <hr className="w-1/2 mx-auto opacity-40" />
              <p className="text-xs mt-2 opacity-100">
                Already on SkyGallery? <Link to="/login" className='text-blue-600'>Log in</Link>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
