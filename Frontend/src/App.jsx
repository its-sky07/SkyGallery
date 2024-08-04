// import Register from "./components/Register";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
// import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { userdetail } from "./Context/Context";

export default function App() {

  // const context =useOutletContext()
  const [search, setsearch] = useState("")
const [user, setuser] = useState(null)
  const [isloggedin, setisloggedin] = useState(true)
  // const [singlepost, setsinglepost] = useState([])
  return (
    <><userdetail.Provider value={{ user,setuser}}>
      <Toaster toastOptions={{ className: 'mt-20' }} />

      <Navbar islog={isloggedin} search={search} setsearch={setsearch}/>
      <Outlet context={ {isloggedin,search,setisloggedin} } />
      </userdetail.Provider>

    </>
  )




}