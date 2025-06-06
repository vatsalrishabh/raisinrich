import { useState } from "react";
import { FaUserAlt, FaShoppingCart, FaSearch } from "react-icons/fa";
import Logo from "../ui/Logo";
import Search from "../ui/Search";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";

const Header = () => {
  const [isSearchModal, setIsSearchModal] = useState(false);
  const [isMenuModal, setIsMenuModal] = useState(false);
  const cart = useSelector((state) => state.cart);

  const router = useRouter();

  const navItems = [
  // { name: "Home", path: "/" },
  // { name: "Menu", path: "/menu" },
  // { name: "About", path: "/about" },
  // { name: "Book Table", path: "/reservation" },

   { name: "Pricing", path: "/pricing" },
  { name: "Food Subscription", path: "/subscription" },
  { name: "Food Menu", path: "/food-menu" },
  { name: "Personal Training", path: "/personal-training" },
  { name: "Transformations", path: "/transformations" },

];

  return (
    <div
      className={`h-[5.5rem] z-50 relative w-full ${
        router.asPath === "/" ? "bg-transparent fixed" : "bg-secondary"
      } backdrop-blur-md`}
    >
      <div className="container mx-auto px-2 sm:px-4 text-white flex justify-between items-center h-full"> {/* Reduced px */}
        <Logo />
        <nav
          className={`sm:static absolute top-0 left-0 sm:w-auto sm:h-auto w-full h-screen sm:text-white text-black sm:bg-transparent bg-white sm:flex hidden z-50 ${
            isMenuModal === true && "!grid place-content-center"
          }`}
        >
          <ul className="flex gap-x-4 sm:gap-x-5 md:gap-x-6 sm:flex-row flex-col items-center sm:flex-nowrap flex-wrap sm:overflow-visible overflow-x-auto px-0"> {/* Reduced gap and px */}
            {navItems.map(({ name, path }) => (
              <li
                key={path}
                className={`px-2 md:px-3 py-2 uppercase hover:text-primary cursor-pointer whitespace-nowrap ${
                  router.asPath === path ? "text-primary" : ""
                }`}
                onClick={() => setIsMenuModal(false)}
              >
                <Link href={path}>{name}</Link>
              </li>
            ))}
          </ul>
          {isMenuModal && (
            <button
              className="absolute top-4 right-4 z-50"
              onClick={() => setIsMenuModal(false)}
            >
              <GiCancel size={25} className="transition-all" />
            </button>
          )}
        </nav>
        <div className="flex gap-x-3 md:gap-x-4 items-center"> {/* Reduced gap */}
          <Link href="/auth/login">
            <span>
              {router.asPath.includes("auth") ? (
                <i
                  className={`fa-solid fa-right-to-bracket ${
                    router.asPath.includes("login") && "text-primary"
                  } `}
                ></i>
              ) : (
                <FaUserAlt
                  className={`hover:text-primary transition-all cursor-pointer ${
                    (router.asPath.includes("auth") ||
                      router.asPath.includes("profile")) &&
                    "text-primary"
                  }`}
                />
              )}
            </span>
          </Link>
          <Link href="/cart">
            <span className="relative">
              <FaShoppingCart
                className={`hover:text-primary transition-all cursor-pointer`}
              />
              <span className="w-4 h-4 text-xs grid place-content-center rounded-full bg-primary absolute -top-2 -right-3 text-black font-bold">
                {cart.products.length === 0 ? "0" : cart.products.length}
              </span>
            </span>
          </Link>
          <button onClick={() => setIsSearchModal(true)}>
            <FaSearch className="hover:text-primary transition-all cursor-pointer" />
          </button>
          {/* <a href="#" className="md:inline-block hidden sm">
            <button className="btn-primary">Order Online</button>
          </a> */}
          <button
            className="sm:hidden inline-block"
            onClick={() => setIsMenuModal(true)}
          >
            <GiHamburgerMenu className="text-xl hover:text-primary transition-all" />
          </button>
        </div>
      </div>
      {isSearchModal && <Search setIsSearchModal={setIsSearchModal} />}
    </div>
  );
};

export default Header;
