import { useEffect, useState } from "react";
import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { Search } from "../Sections/Search";
import { DropdownLoggedOut ,DropdownLoggedIn } from "../index";
import { useCart } from "../../context/cartContext";
export const Header = () => {

  const {cartList}=useCart();
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );
  const [searchSection, setSearchSection] = useState(false);

const [dropdown ,setDropdown]=useState(false);

const token =JSON.parse(sessionStorage.getItem("token"));


  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <header>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4 border-b border-slate-200 dark:border-b-0">
          <Link to="/" className="flex items-center">
            <img src={Logo} className="h-8 mr-3" alt="LearnBridge Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              CourseCrafter
            </span>
          </Link>
          <div className="flex items-center relative">
            <span
              onClick={() => setDarkMode(!darkMode)}
              className="cursor-pointer text-xl text-black dark:text-white mr-5 bi bi-moon-fill"
            ></span>
            <span
              onClick={() => setSearchSection(!searchSection)}
              className="cursor-pointer text-xl text-black dark:text-white mr-5 bi bi-search"
            ></span>
            <Link
              to="/cart"
              className="cursor-pointer text-xl text-black dark:text-white mr-5"
            >
              <span className=" bi bi-cart-fill relative">
                <span className="text-white text-sm absolute -top-1 left-2.5 bg-rose-500 px-1 rounded-full ">
                 {cartList.length}
                </span>
              </span>
            </Link>

            <span onClick={()=> setDropdown(!dropdown)} className="cursor-pointer text-xl text-black dark:text-white mr-5 bi bi-person-circle"></span>
            {dropdown && (token ? <DropdownLoggedIn  setDropdown={setDropdown} /> :<DropdownLoggedOut setDropdown={setDropdown}/>)}
          </div>
        </div>
      </nav>
      {searchSection && <Search setSearchSection={setSearchSection} />}
     
    </header>
  );
};
