import { FaHeart } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { publicRoutes } from '../../../config/router';
import { MdOutlineLogin } from 'react-icons/md';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

export default function Header() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const fetchFilms = async () => {
    navigate(`/films/search?keyword=${keyword}`);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchFilms();
    setKeyword('');
  };
  return (
    <header className="bg-[#333333] text-white">
      <div className="w-320 mx-auto flex items-center justify-between h-23">
        <a
          href={publicRoutes.home}
          className="flex items-center text-xl font-bold text-red-600 uppercase gap-x-2 select-none"
        >
          <span>
            <FaHeart />
          </span>
          <h1>Cinemax Love</h1>
          <span>
            <FaHeart />
          </span>
        </a>
        <div>
          <form
            className="flex border-[1px] border-[#333] border-solid overflow-hidden rounded-md"
            onSubmit={onSubmit}
          >
            <input
              placeholder="Searching..."
              className="px-3 py-2 w-80 outline-none bg-white placeholder:text-black text-black placeholder:italic"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button
              className="px-3 bg-white/20 cursor-pointer border-none text-xl"
              type="submit"
            >
              {' '}
              <IoSearch />{' '}
            </button>
          </form>
        </div>
        <div className="flex items-center gap-x-5">
          <Link to='/login' className="flex items-center gap-x-1 cursor-pointer">
            <span className="text-lg">
              <MdOutlineLogin />
            </span>
            <span className="text-base">Login</span>
          </Link>
          <Link to='/register' className="flex items-center cursor-pointer gap-x-1">
            <span className="text-lg">
              <HiOutlineUserGroup />
            </span>
            <span className="text-base">Register</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
