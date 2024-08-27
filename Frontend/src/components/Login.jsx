import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import toast from 'react-hot-toast'
// import { useContext } from 'react';
// import { userdetail } from '../Context/Context';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

function Login() {
  // const { user, setuser } = useContext(userdetail)
  const context = useOutletContext()
  const baseurl=import.meta.env.VITE_API_URL
  // const [isloggedin, setisloggedin] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
const [password, setpassword] = useState(true)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });


  };
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all the fields")

    }
    try {
      const response = await axios.post(`${baseurl}/user/login`, formData,{
       withCredentials: true
      
      })
      if(!response){
        return  toast.error("invalid userid or pasword")
      }
      console.log(response.data)
      // setuser(response.data)

      if (response.status===200) {
        toast.success("login succesfully")
        navigate("/")
        context.setisloggedin(true)


      } else {
        toast.error("invalid userid or pasword")
      }



    } catch (error) {
      console.error(error)
      toast.error("pls enter valid credentials")

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
              src="https://res.cloudinary.com/dm2c41gia/image/upload/v1723447559/p29ql3xsfk8qw7otjt04.png"
              alt="skylogo logo"
              className="w-20 mx-auto"
            />
            <p className="text-2xl font-bold mt-4 mb-2">Login  to see more</p>

            <form method="POST" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-12 my-1 p-3 text-sm text-gray-700 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
              <div  className='flex'> <input
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
                Sign In
              </button>
            </form>

            

            <footer className="mt-4">
              <p className="text-xs mb-2 opacity-70">
                By continuing, you agree to SkyGallery{" "}
                <b>Terms of Service, SkyGallery policy.</b>
              </p>
              <hr className="w-1/2 mx-auto opacity-40" />
              <p className="text-xs mt-2 opacity-100">
                Not  on SkyGallery? <Link to='/Register' className='text-blue-600'>sign up </Link>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login