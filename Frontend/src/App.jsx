// import Register from "./components/Register";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
// import { useOutletContext } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { userdetail } from "./Context/Context";
import axios from "axios";

export default function App() {






  // const context =useOutletContext()
  const [search, setsearch] = useState("")
  const [user, setuser] = useState(null)
  const [isloggedin, setisloggedin] = useState(false)
  // const [singlepost, setsinglepost] = useState([])


  useMemo(() => {
    const fetchauth = async() => {

      try {
       const res= await axios.get("http://localhost:3000/auth/user" ,{withCredentials:true})
       setuser(res.data)
      console.log(res.data)
      setisloggedin(true)

      } catch (error) {
        console.error(error)

      }
    }
    fetchauth()


  }, [])

  return (
    <><userdetail.Provider value={{ user, setuser }}>
      <Toaster toastOptions={{ className: 'mt-20' }} />

      <Navbar islog={isloggedin} search={search} setsearch={setsearch} />
      <Outlet context={{ isloggedin, search, setisloggedin,user,setuser }} />
    </userdetail.Provider>

    </>
  )




}