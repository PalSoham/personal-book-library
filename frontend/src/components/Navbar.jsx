import { FaSearch, FaBookOpen } from 'react-icons/fa';

export default function Navbar({ search, onSearchChange, totalBooks }) {
  return (
    <header className="bg-white border-b border-gray-100 px-4 md:px-6 h-16 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2.5 flex-shrink-0">
        <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-white shadow-md shadow-violet-200">
          <FaBookOpen className="text-lg" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-gray-800 text-base leading-none tracking-tight">BookShelf</span>
          <span className="text-[10px] text-violet-500 font-semibold tracking-wider uppercase mt-0.5">Personal Library</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md relative mx-auto md:mx-4">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
          <FaSearch className="text-xs" />
        </div>
        <input
          type="text"
          placeholder="Search books by title or author..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="input-focus w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 transition-all"
        />
      </div>

      {/* Book Count Badge */}
      <div className="flex-shrink-0 flex items-center gap-2">
        <span className="text-xs bg-pastel-lavender text-violet-700 font-semibold px-3 py-1.5 rounded-full shadow-sm">
          {totalBooks} {totalBooks === 1 ? 'book' : 'books'}
        </span>
      </div>
    </header>
  );
}
