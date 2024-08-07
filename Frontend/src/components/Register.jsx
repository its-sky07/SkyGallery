import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    fullname:"",
    email: "",
    password: ""
  });

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
      await axios.post('http://localhost:3000/user/register', formData);
      toast.success('Registered successfully');
      navigate("/Login");
    } catch (error) {
      console.error(error);
      toast.error('email or username allready taken');
    }
  };

  return (
    <>

      <div className="flex items-center justify-center min-h-screen bg-gray-500">
        <div className="bg-white w-96 h-auto p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <img
              src="https://i.pinimg.com/originals/d3/d1/75/d3d175e560ae133f1ed5cd4ec173751a.png"
              alt="pin logo"
              className="w-20 mx-auto"
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
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-12 my-1 p-3 text-sm text-gray-700 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
              <button
                type="submit"
                className="w-full h-10 mt-4 mb-2 bg-red-600 text-white text-lg font-bold rounded-full hover:bg-red-700"
              >
                Sign up
              </button>
            </form>

            <p className="text-base font-bold my-2">OR</p>
            <button className="w-full h-10 mb-2 bg-blue-600 text-white text-lg font-bold rounded-full flex items-center justify-center hover:bg-blue-700">
              <i className="fab fa-facebook fa-lg mr-2"></i>
              Continue with Facebook
            </button>
            <button className="w-full h-10 mb-2 bg-gray-300 text-black text-lg font-bold rounded-full flex items-center justify-center hover:bg-gray-400">
              <i className="fab fa-google fa-lg mr-2 text-green-500"></i>
              Continue with Google
            </button>

            <footer className="mt-4">
              <p className="text-xs mb-2 opacity-70">
                By continuing, you agree to Pinterests{" "}
                <b>Terms of Service, Privacy Policy.</b>
              </p>
              <hr className="w-1/2 mx-auto opacity-40" />
              <p className="text-xs mt-2 opacity-100">
                Already on Pinterest? <Link to="/login">Log in</Link>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
