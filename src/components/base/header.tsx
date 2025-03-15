import { FaHeart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { publicRoutes } from "../../config/router";
import { MdOutlineLogin } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";

export default function Header() {
  return <header className="bg-[#333333] text-white">
    <div className="w-320 mx-auto flex items-center justify-between h-23">
      <a href={publicRoutes.home} className="flex items-center text-xl font-bold text-red-600 uppercase gap-x-2 select-none">
        <span><FaHeart /></span>
        <h1>Thuong Thuong</h1>
      </a>
      <div>
        <form className="flex border-[1px] border-[#333] border-solid overflow-hidden rounded-md">
          <input placeholder="Searching..." className="px-3 py-2 w-80 outline-none bg-white placeholder:text-black text-black placeholder:italic"/>
          <button className="px-3 bg-white/20 cursor-pointer border-none text-xl"> <IoSearch /> </button>
        </form>
      </div>
      <div className="flex items-center gap-x-5"> 
        <button className="flex items-center gap-x-1 cursor-pointer gap-x-1">
          <span className="text-lg"><MdOutlineLogin /></span>
          <span className="text-base">Login</span>
        </button>
        <button className="flex items-center gap-x-1 cursor-pointer gap-x-1">
          <span className="text-lg"><HiOutlineUserGroup /></span>
          <span className="text-base">Register</span>
        </button>
      </div>
    </div>
  </header>;
}
