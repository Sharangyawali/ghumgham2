import React,{useState} from "react";
import { GoSearch } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css"
import { useNavigate, Link } from "react-router-dom";
const Navbar=(props)=>{
  const[value,setValue]=useState("")
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();
  const auth = localStorage.getItem("user");
      const handleClick = () => {
    setToggle((prev) => !prev);
  };
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  const searched=(e)=>{
    setValue(e.target.value)
  }
  const onSearch=(value)=>{
    setValue(value)
    props.setS(props.data.filter((data)=>{
      return data&&data.name===value
    }))
  }
    return(
      <>
        <div className="container-fluid  bg-white sticky border-b-2 border-slate-200">
        <div className="row ">
          <div className="col-3 Ghumfir">
              Ghumfir
          </div>
          <div className="col-4 ">
            {/* <ul className=" hidden">
              <li
                className={`font-poppins font-semibold cursor-pointer text-[16px] mx-[16px]`}
              >
                <a href="#" className={`hover:text-primary-color`}>
                  Home
                </a>
              </li>
              <li
                className={`font-poppins font-semibold cursor-pointer text-[16px] mx-[16px]`}
              >
                <a href="#" className={`hover:text-primary-color`}>
                  Explore
                </a>
              </li>
              <li
                className={`font-poppins font-semibold cursor-pointer text-[16px] mx-[16px]`}
              >
                <a href="#" className={`hover:text-primary-color`}>
                  About
                </a>
              </li>
              <li
                className={`font-poppins font-semibold cursor-pointer text-[16px] mx-[16px]`}
              >
                <a href="#" className={`hover:text-primary-color`}>
                  Contact
                </a>
              </li>
            </ul> */}
          </div>

          <div className="col-5  se d-flex justify-content-end items-center gap-4 pe-lg-5">
            <div className="search-box flex items-center">
              <input
                className="search-text"
                type="text"
                name=""
                placeholder="Explore new places"
                value={value}
                onChange={searched}
              />
             
              <button className="search-btn">
                <GoSearch size={22} />
              </button>
            </div>

            {/* <div class="container-fluid">
    <form class="d-flex" role="search">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
    </div> */}
            <div className=" user">
              <button className="" onClick={handleClick}>
                <FaUserCircle size={30} />
              </button>
            </div>
          </div>
        <div
          className={`container bg-white border-2 border-black fixed right-[20px] top-[80px] p-[20px] rounded-lg ${
            toggle ? "" : "hidden"
          } sidebar`}
        >
          <div className="flex justify-between items-center border-b-2 border-gray-600 pb-[10px] gap-4">
            <FaUserCircle size={40} style={{}} />
            <div>
              <h1 className="font-semibold">Hello! {JSON.parse(auth).name}</h1>
              <a>Manage your google account</a>
            </div>
          </div>
          <div className="user-option pt-[10px] z-[9999]">
            <ul className="flex flex-col">
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Send Feedback</a>
              </li>
              <li>
                <Link to='/addplace'>Add Places</Link>
              </li>
              <li>
                <Link onClick={logout} to="/">
                  Sign-out
                </Link>
              </li>
            </ul>
          </div>
        </div>
        </div>
      </div>
      <div className="row justify-content-end">
      <div className="col-lg-2 col-4 dropdown">
              {props.data
              .slice(0,5)
              .filter((data)=>{
               const searchdata=value.toLowerCase();
               const name=data.name.toLowerCase();
               return searchdata&&name.includes(searchdata)&&name!==searchdata
              })
              .map((data,i)=>(
                <div type='submit' onClick={()=>onSearch(data.name)} key={i}>{data.name}</div>
              ))}
              </div>
              </div>
     </>
    )
}
export default Navbar