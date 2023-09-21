import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState(""); // used to set active navlink
  const [toggle, setToggle] = useState(false); // toggle - hide and show navbar for small and big devices
  const [scrolled, setScrolled] = useState(false); //moved to top when page is loaded first time

  useEffect(() => {
    const handleScroll = () => {
      // scroll to Top --feature   {when the page loads }
      const scrollTop = window.scrollY; // Check vertical position
      if (scrollTop > 100) {
        // vertical position more than 100 pixels
        setScrolled(true);
      } else {
        setScrolled(false); // no chage in scroll position
      }
    };
    // window object provides methods and properties to interact with the browser
    const autoHandleScroll = window.addEventListener("scroll", handleScroll);

    return autoHandleScroll;
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX // custom design style in tailwindCss
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between w-full mx-auto max-w-7xl">
        {/* Link tag vs a tag ---use carefully ???????????*/}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0); //scrollTo(x-coord, y-coord)--- top-left corner
          }}
        >
          <img src={logo} alt="logo" className="object-contain w-9 h-9" />
          <p className=" text-green-200 text-[24px] font-bold cursor-pointer flex ">
            {/* &nbsp;   --- non-breaking space 
                          Two words
              separated by a non-breaking space will stick together (not break into a new line). This is handy when breaking the words might be disruptive.
              Examples: 10 km/h , 10 kg etc ...
            */}
            Pradeep &nbsp;
            {/* khedhar -word hide for small devices */}
            <span className="hidden sm:block"> | Khedhar</span>
          </p>
        </Link>

        <ul className="flex-row hidden gap-10 list-none sm:flex">
          {/*  navlinks = array of objects containing id and title properties--dynamic progarmming all navlinks are represented by map method  for big devices  */}
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-end flex-1 sm:hidden">
          <img
            src={toggle ? close : menu} // changing close and menu icon  on toggleState changes
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />
          {/* again using dynamic programming for showing vertical navbar for small devices */}
          <div
            className={`${
              !toggle ? "hidden" : "flex" //toggle=false - show menu icon and hide navlinks list
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="flex flex-col items-start justify-end flex-1 gap-4 list-none">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle); // toggle false-- show menu icon and remove close icon
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
