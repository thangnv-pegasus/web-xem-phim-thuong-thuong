import UserAvatarMenu from '../../ui/user-menu';
import { Link } from 'react-router-dom';
import { MdOutlineLogin } from 'react-icons/md';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { FaHeart } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';

export default function Header() {
  const { user } = useAuth();
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/films/search?keyword=${keyword}`);
      setKeyword('');
    }
  };

  return (
    <header className="bg-[#333333] text-white">
      <div className="w-320 mx-auto flex items-center justify-between h-23">
        <a
          href="/"
          className="flex items-center text-xl font-bold text-red-600 uppercase gap-x-2 select-none"
        >
          <FaHeart />
          <h1>Cinemax Love</h1>
          <FaHeart />
        </a>

        <form
          className="flex border border-[#333] overflow-hidden rounded-md"
          onSubmit={onSubmit}
        >
          <input
            placeholder="Searching..."
            className="px-3 py-2 w-80 outline-none bg-white text-black placeholder:text-gray-600"
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
          />
          <button
            type="submit"
            className="px-3 bg-white/20 cursor-pointer border-none text-xl"
          >
            <IoSearch />
          </button>
        </form>

        <div className="flex items-center gap-x-5">
          {user ? (
            <UserAvatarMenu user={user} />
          ) : (
            <>
              <Link to="/login" className="flex items-center gap-x-1 cursor-pointer">
                <MdOutlineLogin className="text-lg" />
                <span className="text-base">Login</span>
              </Link>
              <Link to="/register" className="flex items-center gap-x-1 cursor-pointer">
                <HiOutlineUserGroup className="text-lg" />
                <span className="text-base">Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
