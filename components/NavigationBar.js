// importing useState and useEffect
import { useState, useEffect } from "react";
// importing axios
import axios from "axios";
// importing link
import Link from "next/link";
// importing router
import { useRouter } from "next/router";
// importing icons
import { AiOutlineAppstore } from "react-icons/ai";
import { AiOutlineShop } from "react-icons/ai";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { AiFillSetting } from "react-icons/ai";
import { AiOutlineDown } from "react-icons/ai";




export default function Nav({ show }) {
  const inactiveLink = ' flex gap-1 py-1 px-2 items-center justify-center ';
  const activeLink = inactiveLink + 'bg-dark-gray text-white rounded-lg ';
  const inactiveIcon = '';
  const activeIcon = inactiveIcon + ' text-white';
  const router = useRouter();
  const { pathname } = router;

  const [categories, setCategories] = useState([])
  const [toggle,setToggle] = useState(false)
  
  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get('/api/categories/categories').then(result => {
      setCategories(result.data);
    });
  }

  return (
    <div className={(show ? 'left-0' : '-left-full') + " top-0 grey_text bg-black p-4 fixed w-full  min-h-screen md:static md:w-auto transition-all ease-in-out duration-500 z-[3]"}>
      <div className="mb-4 flex items-center justify-center w-full lg:w-[15rem] border-b border-dark-gray">
        <h3 className="font-bold text-white">ZENBOARD</h3>
      </div>
      <nav className="flex flex-col gap-2 mt-10 ">
        <Link href={'/'} className={pathname === '/' ? activeLink : inactiveLink}>
          <div className={pathname === '/' ? activeIcon : inactiveIcon}>
            <AiOutlineAppstore size={20} />
          </div>
          Home
        </Link>
        <div>
          <div className={" w-full flex items-center justify-center " + !pathname.includes('/products') ? inactiveLink : activeLink}>
            <Link href={'/products'} className={!pathname.includes('/products') ? inactiveLink : activeLink}>
              <div className={!pathname.includes('/products') ? activeIcon : inactiveIcon}>
                <AiOutlineShop size={20} />
              </div>
              Products
            <div className="flex items-center justify-center ">
              <button onClick={() => setToggle(!toggle)}>
                {toggle ? (<AiOutlineDown size={20} />) : (<AiOutlineDown className="rotate-[-90deg]" size={20} />)}
              </button>
            </div>
            </Link>
    </div>
          {toggle ? (<div className="p-1 text-center">
            {categories.length > 0 && categories.map(category => (
              <option type="checkbox" key={category._id} value={category._id}>{category.name}</option>
            ))}
          </div>) : (null)}
    </div>
        <Link href={'/categories'} className={pathname.includes('/categories') ? activeLink : inactiveLink}>
          <div className={pathname.includes('/categories') ? activeIcon : inactiveIcon}>
            <AiOutlineFolderOpen size={20} />
          </div>
          Categories
        </Link>
        <Link href={'/orders'} className={pathname.includes('/orders') ? activeLink : inactiveLink}>
          <div className={pathname.includes('/orders') ? activeIcon : inactiveIcon}>
            <AiOutlineShoppingCart size={20} />
          </div>
          Orders
        </Link>
        <Link href={'/blog'} className={pathname.includes('/blog') ? activeLink : inactiveLink}>
          <div className={pathname.includes('/blog') ? activeIcon : inactiveIcon}>
            <AiOutlineUsergroupAdd size={20} />
          </div>
          Blog
        </Link>
        <Link href={'/customization'} className={pathname.includes('/customization') ? activeLink : inactiveLink}>
          <div className={pathname.includes('/customization') ? activeIcon : inactiveIcon}>
            <AiOutlineUsergroupAdd size={20} />
          </div>
          Customization
        </Link>
        <Link href={'/admins'} className={pathname.includes('/admins') ? activeLink : inactiveLink}>
          <div className={pathname.includes('/admins') ? activeIcon : inactiveIcon}>
            <AiOutlineUsergroupAdd size={20} />
          </div>
          Admins
        </Link>
        <Link href={'/settings'} className={pathname.includes('/settings') ? activeLink : inactiveLink}>
          <div className={pathname.includes('/settings') ? activeIcon : inactiveIcon}>
            <AiFillSetting size={20} />
          </div>
          Settings
        </Link>
      </nav>
    </div>
  );
}